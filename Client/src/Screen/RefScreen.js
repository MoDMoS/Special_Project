import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
// import nodemailer from 'nodemailer';

const RefScreen= () => {
  const [recipientEmail, setRecipientEmail] = useState('');
  const [referralCode, setReferralCode] = useState('');

  const handleSendReferral = async () => {
    // const transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: 'koonmos3867@gmail.com',
    //     pass: 'Koonmos123'
    //   }
    // });

    // const mailOptions = {
    //   from: 'koonmos3867@gmail.com',
    //   to: recipientEmail,
    //   subject: 'Referral Code',
    //   text: `Here's your referral code: ${referralCode}`
    // };

    // await transporter.sendMail(mailOptions);
    // alert('Referral code sent successfully!');
  };

  return (
    <View>
      <Text>Recipient Email:</Text>
      <TextInput value={recipientEmail} onChangeText={setRecipientEmail} />

      <Text>Referral Code:</Text>
      <TextInput value={referralCode} onChangeText={setReferralCode} />

      <Button title="Send Referral" onPress={handleSendReferral} />
    </View>
  );
};

export default RefScreen;
