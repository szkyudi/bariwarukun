import { css } from "@emotion/react"

export const Header = () => (
  <header css={styles.header}>
    <h1>割り勘電卓</h1>
  </header>
)

const styles = {
  header: css`
    background: skyblue;
    font-size: 24px;
    font-weight: bold;
    padding: 8px;
  `,
}
