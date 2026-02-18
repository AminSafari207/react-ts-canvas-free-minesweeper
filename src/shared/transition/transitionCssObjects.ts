import { CSSObject, Theme } from "@mui/material";

export const fadeEnterAndExit = (theme: Theme): CSSObject => ({
  '&.fade-enter': {
    opacity: 0,
  },
  '&.fade-enter-active': {
    opacity: 1,
    transition: `opacity ${theme.transitions.duration.shortest}ms ${theme.transitions.easing.easeInOut}`,
  },
  '&.fade-exit': {
    opacity: 1,
  },
  '&.fade-exit-active': {
    opacity: 0,
    transition: `opacity ${theme.transitions.duration.shortest}ms ${theme.transitions.easing.easeInOut}`,
  },
})
