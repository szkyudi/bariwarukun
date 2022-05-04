import { ContentCopy } from "@mui/icons-material"
import { Alert, Button, Slide, Snackbar, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { useState } from "react"
import { useRecoilValue } from "recoil"
import { queryParamsState } from "../lib/state"

export const LinkShareButton = () => {
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
        <Slide direction="left" in={!!queryParams}>
          <Button onClick={handleClick} variant="text" color="inherit" startIcon={<ContentCopy />}>
            <Typography fontWeight="bold">
              結果をリンクとしてシェア
            </Typography>
          </Button>
        </Slide>
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
