import styled from "@emotion/styled"
import { ContentCopy } from "@mui/icons-material"
import { Alert, Button, Snackbar, Typography } from "@mui/material"
import { useState } from "react"
import { useRecoilValue } from "recoil"
import { queryParamsState } from "../lib/state"

export const LinkShareButton = () => {
  const queryParams = useRecoilValue(queryParamsState);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(location.origin + queryParams);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <>
      <Button onClick={handleClick} variant="text" color="inherit" startIcon={<ContentCopy />}>
        <Typography fontWeight="bold">
          結果をリンクとしてシェア
        </Typography>
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <Alert severity="success">
          クリップボードにコピーしました
        </Alert>
      </Snackbar>
    </>
  )
}
