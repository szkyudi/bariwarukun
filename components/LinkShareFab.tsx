import { ContentCopy } from "@mui/icons-material"
import { Alert, Fab, Snackbar, Typography, Zoom } from "@mui/material"
import { useRouter } from "next/router"
import { useState } from "react"
import { useRecoilValue } from "recoil"
import { queryParamsState } from "../lib/state"

export const LinkShareFab = () => {
  const queryParams = useRecoilValue(queryParamsState);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    navigator.clipboard.writeText(location.origin + queryParams);
    router.push(queryParams);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  if (!!queryParams) {
    return (
      <>
        <Zoom in={!!queryParams}>
          <Fab onClick={handleClick} color="primary" variant="extended" sx={{position: 'fixed', bottom: 16, right: 16}}>
            <ContentCopy sx={{ mr: 1 }} />
            <Typography fontWeight="bold">
              結果をリンクとしてシェア
            </Typography>
          </Fab>
        </Zoom>
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
  } else {
    return <></>;
  }
}
