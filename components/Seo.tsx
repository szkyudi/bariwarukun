import Head from "next/head"
import config from "../lib/config"

type Props = {
  title?: string,
  url?: string,
  description?: string,
  type?: 'website' | 'article',
  imageUrl?: string,
  width?: number,
  height?: number,
}
export const Seo = ({ title, url, description, type = 'article', imageUrl, width, height }: Props) => {
  return (
    <Head>
      <title>{title || config.title + config.titleSeperator + config.subtitle}</title>
      <meta name="description" content={description || config.description} key="description" />
      <meta property='og:title' content={title} key="og:title" />
      <meta property='og:url' content={url || config.siteUrl} key="og:url" />
      <meta property='og:type' content={type} key="og:type" />
      <meta property='og:description' content={description || config.description} key="og:description" />
      <meta property='og:image' content={imageUrl || config.defaultOgImageUrl} key="og:image" />
      <meta property='og:image:width' content={String(width || 1200)} key="og:image:width" />
      <meta property='og:image:height' content={String(height || 630)} key="og:image:height" />
      <meta property='og:site_name' content={config.title} key="og:site_name" />
      <meta name='twitter:card' content='summary_large_image' key="twitter:card" />
      <meta name='twitter:site' content={`@${config.twitterId}`} key="twitter:site" />
      <meta name='twitter:creator' content={`@${config.twitterId}`} key="twitter:creator" />
      <link rel="canonical" href={url || config.siteUrl} />
    </Head>
  )
}
