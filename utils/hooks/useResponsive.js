import { useMediaQuery } from "react-responsive";

// export const useResponsive = (maxWidth, minWidth) => {
export const useResponsive = () => {
  const isSuperBigScreen = useMediaQuery({
    minWidth: 2270,
  });

  const isBigScreen = useMediaQuery({
    minWidth: 1400,
  });

  const isDesktop = useMediaQuery({
    minWidth: 1200,
    maxWidth: 4000,
  });

  const isSmallDesktop = useMediaQuery({
    minWidth: 769,
    maxWidth: 1200,
  });

  const isLowerThanSmallDesktop = useMediaQuery({
    minWidth: 0,
    maxWidth: 970,
  });

  const isTablet = useMediaQuery({
    minWidth: 501,
    maxWidth: 768,
  });

  const isTabletOrPhone = useMediaQuery({
    maxWidth: 768,
  });

  const isPhone = useMediaQuery({
    maxWidth: 500,
  });

  const isSmallPhone = useMediaQuery({
    maxWidth: 393,
  });

  const isLowerThan450 = useMediaQuery({
    maxWidth: 450,
  });

  const feedBreakpoint = useMediaQuery({
    maxWidth: 970,
  });

  return {
    isBigScreen,
    isTablet,
    isPhone,
    isDesktop,
    isTabletOrPhone,
    isSmallDesktop,
    isSuperBigScreen,
    isSmallPhone,
    isLowerThanSmallDesktop,
    feedBreakpoint,
    isLowerThan450,
  };
};
