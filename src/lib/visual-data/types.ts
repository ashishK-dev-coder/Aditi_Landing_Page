export interface VisualContent {
  _note?: string;
  site?: {
    consultationAnchor?: string;
    bookUrl?: string;
    sectionOrder?: string[];
    themeId?: string;
  };
  navbar?: {
    logoUrl?: string;
    logoScale?: number;
    brandPrimary?: string;
    brandAccent?: string;
    ctaText?: string;
  };
  hero?: {
    headingGradient?: string;
    headingRest?: string;
    subheading?: string;
    benefits?: string[];
    ctaText?: string;
    imageUrl?: string;
    imageAlt?: string;
    imageOrientation?: "vertical" | "horizontal";
    imageScale?: number;
    badgeImageUrl?: string;
    badgeImageAlt?: string;
    badgeTitle?: string;
    badgeSubtitle?: string;
  };
  vsl?: {
    headingLine1?: string;
    headingGradient?: string;
    headingLine2?: string;
    videoUrl?: string;
    videoThumbnailUrl?: string;
    videoThumbnailAlt?: string;
    imageOrientation?: "vertical" | "horizontal";
    imageScale?: number;
    tagsLabel?: string;
    tags?: string[];
    subtext?: string;
    ctaText?: string;
  };
  testimonials?: {
    heading?: string;
    subheading?: string;
    imageOrientation?: "vertical" | "horizontal";
    imageScale?: number;
    items?: Array<{
      imageUrl?: string;
      imageAlt?: string;
      quote?: string;
      showBeforeAfter?: boolean;
      beforeLabel?: string;
      afterLabel?: string;
      showPlayButton?: boolean;
    }>;
  };
  videoTestimonials?: {
    badge?: string;
    headingLine1?: string;
    headingGradient?: string;
    subheading?: string;
    brandPrimary?: string;
    brandAccent?: string;
    sponsoredLabel?: string;
    items?: Array<{
      id: number;
      name: string;
      location: string;
      quote: string;
      thumbnail: string;
      videoUrl?: string;
    }>;
  };
  screenshots?: {
    badge?: string;
    headingLine1?: string;
    headingGradient?: string;
    subheading?: string;
    brandPrimary?: string;
    brandAccent?: string;
    sponsoredLabel?: string;
    items?: Array<{
      id: number;
      name: string;
      location: string;
      quote: string;
      thumbnail: string;
      videoUrl?: string;
    }>;
  };
  wellnessKit?: {
    heading?: string;
    subheading?: string;
    imageUrl?: string;
    imageAlt?: string;
    imageOrientation?: "vertical" | "horizontal";
    imageScale?: number;
    highlights?: string[];
    ctaText?: string;
  };
  howItWorks?: {
    heading?: string;
    steps?: Array<{ step: string; title: string; desc: string }>;
  };
  team?: {
    heading?: string;
    subheading?: string;
    members?: Array<{ name: string; role: string; imageUrl: string }>;
  };
  cta?: {
    headingLine1?: string;
    headingLine2?: string;
    subheading?: string;
    nameLabel?: string;
    namePlaceholder?: string;
    emailLabel?: string;
    emailPlaceholder?: string;
    submitText?: string;
  };
  footer?: {
    brand?: string;
    copyrightSuffix?: string;
  };
}
