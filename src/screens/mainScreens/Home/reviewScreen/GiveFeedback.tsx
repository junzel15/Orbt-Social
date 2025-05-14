import React, {useState} from 'react';
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
import {imagePath} from '../../../../constants/imagePath';
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
    booking_id: string;
    event_id?: string;
  };
};

const FeedbackScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<RouteProp<RouteParams, 'params'>>();
  const uuid = useSelector(selectUserUuid);
  const booking_id = route?.params?.booking_id;
  const event_id = route?.params?.event_id;

  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('Great experience!');
  const [selectedTags, setSelectedTags] = useState<string[]>(['Food Quality']);
  const [votes, setVotes] = useState<Record<string, string>>({
    Kevin: 'yes',
    Karissa: 'no',
    Christian: 'not-there',
    Brittany: 'yes',
  });

  const handleSubmit = async () => {
    try {
      const payload = {
        booking_id,
        uuid,
        comment,
        rating,
        votes,
        selectedTags,
        ...(event_id && {event_id}),
      };

      const response = await axios.post(
        'https://wchkles84d.execute-api.us-east-1.amazonaws.com/default/submit',
        JSON.stringify(payload),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.status === 200) {
        Alert.alert('✅ Success', 'Review submitted successfully');
        navigation.navigate(navigationStrings.SuccessfulFeedback);
      } else {
        Alert.alert('⚠️ Error', 'Failed to submit review');
      }
    } catch (error: any) {
      console.error('❌ Review submission error:', error);
      if (error.response) {
        console.log('❗Error Response Data:', error.response.data);
        console.log('❗Error Response Status:', error.response.status);
        console.log('❗Error Response Headers:', error.response.headers);
      } else if (error.request) {
        console.log('📭 No response received:', error.request);
      } else {
        console.log('🛠 Error config:', error.config);
      }
      Alert.alert('❌ Error', 'Something went wrong');
    }
  };

  const handleVoteChange = (name: string, option: string) => {
    setVotes(prev => ({...prev, [name]: option}));
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
          {Object.entries(votes).map(([name, selected], index) => (
            <View key={index} style={{marginTop: 10}}>
              <View style={styles.personRow}>
                <Image source={imagePath.dining} style={styles.avatar} />
                <Text style={styles.personName}>{name}</Text>
              </View>
              <View style={styles.voteButtons}>
                {VOTE_OPTIONS.map(option => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.voteOption,
                      selected === option && styles.selectedVoteOption,
                    ]}
                    onPress={() => handleVoteChange(name, option)}>
                    <Text
                      style={[
                        styles.voteText,
                        selected === option && styles.selectedVoteText,
                      ]}>
                      {option === 'yes'
                        ? '👍 Yes'
                        : option === 'no'
                        ? '👎 No'
                        : '❓ Not There'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}

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
  subLabel: {
    color: colors.black,
    fontSize: getScaledFontSize(12),
    marginTop: 4,
    fontFamily: fonts.fontRegular,
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
});
