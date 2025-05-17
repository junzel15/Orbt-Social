import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CommonHeader from '../../../../components/header/CommonHeader';
import {globalStyleDefinitions} from '../../../../constants/globalStyleDefinitions';
import {getScaledFontSize} from '../../../../constants/globalFunctions';
import {fonts} from '../../../../constants/fonts';
import {colors} from '../../../../constants/colors';
import CommonButton from '../../../../components/atoms/button/CommonButton';
import {navigationStrings} from '../../../../navigation/navigationStrings';
import {
  NavigationProp,
  useNavigation,
  useRoute,
  RouteProp,
} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {selectUserUuid} from '../../../../redux/slices/userSetupSlice';
import axios from 'axios';

const VOTE_OPTIONS = ['yes', 'no', 'not-there'];
const FEEDBACK_TAGS = [
  'Food Quality',
  'Service',
  'Ambiance',
  'Value for money',
  'Location/Accessibility',
];

type RouteParams = {
  params: {
    group_id: string;
    event_id?: string;
  };
};

type MemberInfo = {
  name: string;
  image_url: string;
};

const FeedbackScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<RouteProp<RouteParams, 'params'>>();
  const uuid = useSelector(selectUserUuid);
  const group_id = route?.params?.group_id;
  const event_id = route?.params?.event_id;

  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [votes, setVotes] = useState<Record<string, string>>({});
  const [members, setMembers] = useState<Record<string, MemberInfo>>({});

  useEffect(() => {
    const fetchGroupMembers = async () => {
      try {
        const res = await axios.get(
          `https://64qrydie0a.execute-api.us-east-1.amazonaws.com/default/group/${group_id}`,
        );

        const memberMap = res.data?.members || {};
        setMembers(memberMap);

        const initialVotes = Object.fromEntries(
          Object.keys(memberMap).map(memberUuid => [
            memberUuid,
            memberUuid === uuid ? '' : '',
          ]),
        );
        setVotes(initialVotes);
      } catch (error) {
        console.error('❌ Error loading group members:', error);
      }
    };

    fetchGroupMembers();
  }, [group_id, uuid]);

  const handleSubmit = async () => {
    try {
      const payload = {
        group_id,
        uuid,
        comment,
        rating,
        votes,
        selectedTags,
        ...(event_id && {event_id}),
      };

      const response = await axios.post(
        'https://64qrydie0a.execute-api.us-east-1.amazonaws.com/default/submit',
        JSON.stringify(payload),
        {
          headers: {'Content-Type': 'application/json'},
        },
      );

      if (response.status === 200) {
        Alert.alert('✅ Success', 'Review submitted successfully');
        navigation.navigate(navigationStrings.SuccessfulFeedback);
      } else {
        Alert.alert('⚠️ Error', 'Failed to submit review');
      }
    } catch (error) {
      console.error('❌ Submission Error:', error);
      Alert.alert('❌ Error', 'Something went wrong');
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag],
    );
  };

  return (
    <LinearGradient
      colors={['#4C0BCE', '#180028', '#000000']}
      locations={[0.0, 0.5, 0.8]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.container}>
      <CommonHeader showBackIcon={true} headerTitle="" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{paddingBottom: 40}}
        showsVerticalScrollIndicator={false}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.title}>Leave a Review</Text>
          <Text style={styles.subtitle}>How was your overall experience?</Text>
          <View style={styles.stars}>
            {[1, 2, 3, 4, 5].map(i => (
              <TouchableOpacity key={i} onPress={() => setRating(i)}>
                <FontAwesome5
                  name="star"
                  solid={i <= rating}
                  color={i <= rating ? '#FFC107' : '#aaa'}
                  size={30}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.whiteCard}>
          <Text style={styles.improveLabel}>What can we improve?</Text>
          <View style={styles.tagWrap}>
            {FEEDBACK_TAGS.map(tag => (
              <TouchableOpacity
                key={tag}
                style={[
                  styles.tagButton,
                  selectedTags.includes(tag) && styles.activeTag,
                ]}
                onPress={() => toggleTag(tag)}>
                <Text
                  style={[
                    styles.tagText,
                    selectedTags.includes(tag) && styles.activeTagText,
                  ]}>
                  {tag}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.improveLabel}>Comment:</Text>
          <TextInput
            value={comment}
            onChangeText={setComment}
            style={styles.input}
            multiline
            placeholder="Write your comment..."
            placeholderTextColor="#999"
          />

          <Text style={styles.improveLabel}>
            Who would you like to see again at the table?
          </Text>
          {Object.entries(members)
            .filter(([memberUuid]) => memberUuid !== uuid)
            .map(([memberUuid, member]) => {
              const selected = votes[memberUuid] || '';
              const isSelf = memberUuid === uuid;

              return (
                <View key={memberUuid} style={{marginTop: 10}}>
                  <View style={styles.personRow}>
                    {member?.image_url ? (
                      <Image
                        source={{uri: member.image_url}}
                        style={styles.avatar}
                      />
                    ) : (
                      <View style={[styles.avatar, styles.placeholderAvatar]}>
                        <Text style={styles.avatarLetter}>
                          {member?.name?.charAt(0).toUpperCase() || 'U'}
                        </Text>
                      </View>
                    )}
                    <Text style={styles.personName}>
                      {member?.name || 'Unknown'}
                    </Text>
                  </View>

                  {!isSelf && (
                    <View style={styles.voteButtons}>
                      {VOTE_OPTIONS.map(option => {
                        const isSelected = selected === option;
                        return (
                          <TouchableOpacity
                            key={`${memberUuid}-${option}`}
                            style={[
                              styles.voteOption,
                              isSelected && styles.selectedVoteOption,
                            ]}
                            onPress={() =>
                              setVotes(prev => ({
                                ...prev,
                                [memberUuid]:
                                  prev[memberUuid] === option ? '' : option,
                              }))
                            }>
                            <Text
                              style={[
                                styles.voteText,
                                isSelected && styles.selectedVoteText,
                              ]}>
                              {option === 'yes'
                                ? '👍 Yes'
                                : option === 'no'
                                ? '👎 No'
                                : '❓ Not There'}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  )}
                </View>
              );
            })}

          <CommonButton title="Submit" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default FeedbackScreen;

const styles = StyleSheet.create({
  container: {flex: 1},
  scroll: {
    flex: 1,
    paddingHorizontal: globalStyleDefinitions.screenPadding.padding,
  },
  title: {
    fontSize: getScaledFontSize(24),
    fontFamily: fonts.soraRegular,
    color: colors.white,
    marginBottom: globalStyleDefinitions.mb_10.marginBottom,
  },
  subtitle: {
    color: colors.white,
    fontSize: getScaledFontSize(16),
    fontFamily: fonts.fontRegular,
    marginBottom: globalStyleDefinitions.mb_10.marginBottom,
  },
  stars: {flexDirection: 'row', gap: 12, marginBottom: 24},
  whiteCard: {
    backgroundColor: colors.white,
    borderRadius: globalStyleDefinitions.br_10.borderRadius,
    padding: globalStyleDefinitions.screenPadding.padding,
  },
  improveLabel: {
    color: colors.black,
    fontSize: getScaledFontSize(14),
    fontFamily: fonts.fontSemiBold,
    marginBottom: globalStyleDefinitions.mb_10.marginBottom,
    alignSelf: 'flex-start',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    width: '100%',
    padding: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
    fontFamily: fonts.fontRegular,
    fontSize: getScaledFontSize(14),
    color: colors.black,
    minHeight: 80,
  },
  personRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: globalStyleDefinitions.gap.gap,
  },
  personName: {
    fontFamily: fonts.fontBold,
    fontSize: getScaledFontSize(14),
    color: colors.black,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  voteButtons: {
    flexDirection: 'row',
    marginVertical: 8,
    gap: 8,
  },
  voteOption: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 8,
    borderRadius: 6,
  },
  selectedVoteOption: {
    backgroundColor: '#4C0BCE',
  },
  voteText: {
    color: '#444',
  },
  selectedVoteText: {
    color: '#fff',
  },
  tagWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  tagButton: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  tagText: {
    fontSize: 12,
    color: '#444',
  },
  activeTag: {
    backgroundColor: '#4C0BCE',
  },
  activeTagText: {
    color: '#fff',
  },
  placeholderAvatar: {
    backgroundColor: '#999',
    justifyContent: 'center',
    alignItems: 'center',
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  avatarLetter: {
    color: '#fff',
    fontSize: getScaledFontSize(14),
    fontFamily: fonts.fontBold,
  },
});
