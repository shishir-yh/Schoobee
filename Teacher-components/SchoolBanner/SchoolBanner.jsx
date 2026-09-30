import { View, Text, Image, ImageBackground, StyleSheet } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { school } from '../../data/Common_information/SchoolBannerInformation';

// ---------- Component ----------
export default function SchoolBanner() {
  const { name, address, logo, image } = school;

  return (
    <View style={styles.wrapper}>
      <ImageBackground
        source={image}
        style={styles.background}
        resizeMode="cover"
      >
        {/* Dark overlay so the white text is readable */}
        <View style={styles.overlay} />

        {/* Purple (#8374BC) shadow fading from the top of the picture */}
        <LinearGradient
          colors={['rgba(131, 116, 188, 0.95)', 'rgba(131, 116, 188, 0)']}
          style={styles.topShadow}
          pointerEvents="none"
        />
  

        <View style={styles.content}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />

          <Text style={styles.schoolName} numberOfLines={2} adjustsFontSizeToFit>
            {name}
          </Text>

          <Text style={styles.address} numberOfLines={2}>
            {address}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
}

// ---------- Styles ----------
const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 12,
    marginTop: 8,
    borderRadius: 22,

    // Shadow - iOS #4A4658
    shadowColor: '#78A982',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 10,
    shadowRadius: 8,

    // Shadow - Android
    elevation: 6,

    backgroundColor: '#78A982',
  },

  background: {
    width: '100%',
    borderRadius: 22,
    overflow: 'hidden',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10, 25, 60, 0.6)',
  },

  topShadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200, // increase for a longer shadow, decrease for a shorter one
  },

 content: {
  alignItems: 'center',
  paddingTop: 2,      // was paddingVertical: 18, this removes the top space
  paddingBottom: 10,  // keeps the space at the bottom
  paddingHorizontal: 16,
},

  logo: {
    width: 60,
    height: 60,
    borderRadius: 32,
    marginBottom: 1,
  },

  schoolName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.5,
    textAlign: 'center',
  },

  address: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    marginTop: 4,
    textAlign: 'center',
  },
});