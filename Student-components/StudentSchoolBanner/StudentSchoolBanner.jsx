import { View, Text, Image, ImageBackground, StyleSheet } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { school } from '../../data/Common_information/SchoolBannerInformation';

// ---------- Deep purple palette (change here to tune everything) ----------
const DEEP_PURPLE = '#4A148C';        // hard deep purple (shadow + border)
const OVERLAY_PURPLE = 'rgba(55, 10, 110, 0.72)'; // strong purple tint over the photo
const TOP_PURPLE_START = 'rgba(74, 20, 140, 1)';  // top of the gradient (solid)
const TOP_PURPLE_END = 'rgba(74, 20, 140, 0)';    // fades to transparent

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
        {/* Deep purple overlay so the white text is readable */}
        <View style={styles.overlay} />

        {/* Deep purple shadow fading from the top of the picture */}
        <LinearGradient
          colors={[TOP_PURPLE_START, TOP_PURPLE_END]}
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

    // Thin deep purple edge so the color is clearly visible
    borderWidth: 1.5,
    borderColor: DEEP_PURPLE,

    // Shadow - iOS (full strength deep purple)
    shadowColor: DEEP_PURPLE,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 14,

    // Shadow - Android (API 28+ uses shadowColor for the elevation tint)
    elevation: 18,

    backgroundColor: '#2E0A5E',
  },

  background: {
    width: '100%',
    borderRadius: 22,
    overflow: 'hidden',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: OVERLAY_PURPLE,
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
    paddingTop: 2,
    paddingBottom: 10,
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