import {NativeModules, Platform, processColor} from 'react-native';
const {RNModuleTransparent} = NativeModules;

const navigationHide = async () => {
  if (Platform.OS === 'android') {
    return await RNModuleTransparent.navigationHide();
  }
};

const navigationShow = async () => {
  if (Platform.OS === 'android') {
    return await RNModuleTransparent.navigationShow();
  }
};

const leanBack = async (enabled?: boolean) => {
  if (Platform.OS === 'android') {
    const state = typeof enabled === 'boolean' ? enabled : true;
    return await RNModuleTransparent.leanBack(state);
  }
};

const immersive = async () => {
  if (Platform.OS === 'android') {
    return await RNModuleTransparent.immersive();
  }
};

const stickyImmersive = async (enabled?: boolean) => {
  if (Platform.OS === 'android') {
    const state = typeof enabled === 'boolean' ? enabled : true;
    return await RNModuleTransparent.stickyImmersive(state);
  }
};

const lowProfile = async (enabled?: boolean) => {
  if (Platform.OS === 'android') {
    const state = typeof enabled === 'boolean' ? enabled : true;
    return await RNModuleTransparent.lowProfile(state);
  }
};

const getBarModeTypes = (
  style?: 'light' | 'dark',
  bar?: 'navigation' | 'status' | 'both',
) => {
  const modeStyle =
    style === 'light'
      ? RNModuleTransparent.LIGHT
      : style === 'dark'
      ? RNModuleTransparent.DARK
      : RNModuleTransparent.NO_MODE;

  const mode =
    bar === 'navigation'
      ? RNModuleTransparent.NAVIGATION_BAR
      : bar === 'status'
      ? RNModuleTransparent.STATUS_BAR
      : RNModuleTransparent.NAVIGATION_BAR_STATUS_BAR;

  return {
    modeStyle,
    mode,
  };
};

const setBarMode = async (
  style?: 'light' | 'dark',
  bar?: 'navigation' | 'status' | 'both',
) => {
  if (Platform.OS === 'android') {
    const {modeStyle, mode} = getBarModeTypes(style, bar);
    return await RNModuleTransparent.setBarMode(modeStyle, mode);
  }
};

const setNavigationColor = async (
  color: string | number,
  style?: 'light' | 'dark',
  bar?: 'navigation' | 'status' | 'both',
) => {
  if (Platform.OS === 'android') {
    const {modeStyle, mode} = getBarModeTypes(style, bar);
    return await RNModuleTransparent.setNavigationColor(
      color === 'translucent' ? 0 : processColor(color),
      color === 'translucent',
      modeStyle,
      mode,
    );
  }
};

const setNavigationBarDividerColor = async (color: string | number) => {
  if (Platform.OS === 'android') {
    return await RNModuleTransparent.setNavigationBarDividerColor(
      processColor(color),
    );
  }
};

const setNavigationBarContrastEnforced = async (enabled?: boolean) => {
  if (Platform.OS === 'android') {
    const state = typeof enabled === 'boolean' ? enabled : true;
    return await RNModuleTransparent.setNavigationBarContrastEnforced(state);
  }
};

const fullScreen = async (enabled?: boolean) => {
  if (Platform.OS === 'android') {
    const state = typeof enabled === 'boolean' ? enabled : true;
    return await RNModuleTransparent.fullScreen(state);
  }
};

export type GetBarColorType = string | {status: string; navigation: string};

const getBarColor = async (
  bar?: 'navigation' | 'status' | 'both',
): Promise<GetBarColorType> => {
  if (Platform.OS === 'android') {
    const {mode} = getBarModeTypes('light', bar || 'both');
    const result = await RNModuleTransparent.getBarColor(mode);

    if (mode === RNModuleTransparent.NAVIGATION_BAR_STATUS_BAR) {
      return JSON.parse(result);
    } else {
      return result;
    }
  }
  return '';
};

const setFitsSystemWindows = async (enabled?: boolean) => {
  if (Platform.OS === 'android') {
    const state = typeof enabled === 'boolean' ? enabled : true;
    return await RNModuleTransparent.setFitsSystemWindows(state);
  }
};

var mySystemNavigation = {
  navigationHide,
  navigationShow,
  leanBack,
  immersive,
  stickyImmersive,
  lowProfile,
  setBarMode,
  setNavigationColor,
  setNavigationBarDividerColor,
  setNavigationBarContrastEnforced,
  fullScreen,
  getBarColor,
  setFitsSystemWindows,
};

export default mySystemNavigation;
