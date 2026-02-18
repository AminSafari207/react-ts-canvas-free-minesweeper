import { alpha, Paper, PaperProps, styled } from '@mui/material'

export const GlassyPaper = styled((props: PaperProps) => <Paper elevation={8} {...props} />)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 8,
  border: `2px solid ${alpha('#969696ff', 0.2)}`,
  backgroundColor: alpha(theme.palette.background.paper, 0.8),
}))
