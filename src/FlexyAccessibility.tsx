import React from "react";
import { AriaRole } from "react";

export const WA = (props: { children?: React.ReactNode }) => {
  return <div flexy-type="wa">{props.children}</div>;
};

export const Meta = (props: {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string[];
  author?: string;
  replyTo?: string;
  contentLanguage?: string;
  encoding?: string;
  refreshSeconds?: number;
  rating?: "general" | "mature" | "restricted" | "14 years";
  robotPolicy?: {
    index?: boolean;
    follow?: boolean;
    archive?: boolean;
    snippet?: boolean;
    for?: string[];
  }[];
  openGraph?: {
    title?: string;
    type?: string;
    image?: string;
    url?: string;
    description?: string;
    siteName?: string;
    locale?: string;
    localeAlternate?: string[];
    audio?: string;
    determiner?: string;
    video?: string;
    videoSecureUrl?: string;
    videoType?: string;
    videoWidth?: number;
    videoHeight?: number;
    videoTag?: string;
    videoSecureUrlTag?: string;
    videoTypeTag?: string;
    videoWidthTag?: string;
    videoHeightTag?: string;
  }[];
  twitter?: {
    card?: string;
    site?: string;
    creator?: string;
    title?: string;
    description?: string;
    image?: string;
    imageAlt?: string;
  }[];
  canonical?: string;
  alternate?: {
    href?: string;
    hrefLang?: string;
  }[];
  amp?: string;
  amphtml?: string;
}) => {
  const { children, ...data } = props;
  return (
    <div flexy-type="meta" {...data}>
      {children}
    </div>
  );
};

export const Header = (props: {
  children?: React.ReactNode;
  name: string;
  role: "group" | "none" | "presentation" | "banner";
}) => {
  const { children, ...data } = props;
  return (
    <div flexy-type="header" {...data}>
      {children}
    </div>
  );
};

export const Navigation = (props: {
  children?: React.ReactNode;
  name: string;
  role: "menu" | "menubar" | "tablist";
}) => {
  const { children, ...data } = props;
  return (
    <div flexy-type="nav" {...data}>
      {children}
    </div>
  );
};

export const Main = (props: { children?: React.ReactNode; name: string }) => {
  const { children, ...data } = props;
  return (
    <div flexy-type="main" {...data}>
      {children}
    </div>
  );
};

export const Article = (props: {
  children?: React.ReactNode;
  name: string;
  role:
    | "article"
    | "application"
    | "document"
    | "feed"
    | "main"
    | "none"
    | "presentation"
    | "region";
}) => {
  const { children, ...data } = props;
  return (
    <div flexy-type="article" {...data}>
      {children}
    </div>
  );
};

export const Section = (props: {
  children?: React.ReactNode;
  name: string;
  role:
    | "region"
    | "alert"
    | "alertdialog"
    | "application"
    | "banner"
    | "complementary"
    | "contentinfo"
    | "dialog"
    | "document"
    | "feed"
    | "log"
    | "main"
    | "marquee"
    | "navigation"
    | "none"
    | "note"
    | "presentation"
    | "search"
    | "status"
    | "tabpanel";
}) => {
  const { children, ...data } = props;
  return (
    <div flexy-type="section" {...data}>
      {children}
    </div>
  );
};

export const Aside = (props: {
  children?: React.ReactNode;
  name: string;
  role:
    | "complementary"
    | "feed"
    | "none"
    | "note"
    | "presentation"
    | "region"
    | "search";
}) => {
  const { children, ...data } = props;
  return (
    <div flexy-type="aside" {...data}>
      {children}
    </div>
  );
};

export const Footer = (props: { children?: React.ReactNode; name: string }) => {
  const { children, ...data } = props;
  return (
    <div flexy-type="footer" {...data}>
      {children}
    </div>
  );
};

export const Table = (props: { children?: React.ReactNode; name: string }) => {
  const { children, ...data } = props;
  return (
    <div flexy-type="table" {...data}>
      {children}
    </div>
  );
};

export const TableBody = (props: {
  children?: React.ReactNode;
  name: string;
}) => {
  const { children, ...data } = props;
  return (
    <div flexy-type="tbody" {...data}>
      {children}
    </div>
  );
};

export const TableFoot = (props: {
  children?: React.ReactNode;
  name: string;
}) => {
  const { children, ...data } = props;
  return (
    <div flexy-type="tfoot" {...data}>
      {children}
    </div>
  );
};

export const TableCaption = (props: {
  children?: React.ReactNode;
  name: string;
}) => {
  const { children, ...data } = props;
  return (
    <div flexy-type="caption" {...data}>
      {children}
    </div>
  );
};

export const TableColumnGroup = (props: {
  children?: React.ReactNode;
  name: string;
}) => {
  const { children, ...data } = props;
  return (
    <div flexy-type="colgroup" {...data}>
      {children}
    </div>
  );
};

export const TableColumn = (props: {
  children?: React.ReactNode;
  name: string;
}) => {
  const { children, ...data } = props;
  return (
    <div flexy-type="col" {...data}>
      {children}
    </div>
  );
};

export const TableRow = (props: {
  children?: React.ReactNode;
  name: string;
}) => {
  const { children, ...data } = props;
  return (
    <div flexy-type="tr" {...data}>
      {children}
    </div>
  );
};

export const TableHead = (props: {
  children?: React.ReactNode;
  name: string;
}) => {
  const { children, ...data } = props;
  return (
    <div flexy-type="th" {...data}>
      {children}
    </div>
  );
};

export const TableCell = (props: {
  children?: React.ReactNode;
  name: string;
}) => {
  const { children, ...data } = props;
  return (
    <div flexy-type="td" {...data}>
      {children}
    </div>
  );
};

export const UnorderedList = (props: {
  children?: React.ReactNode;
  list: string;
  item?: string;
  role:
    | "list"
    | "directory"
    | "group"
    | "listbox"
    | "menu"
    | "menubar"
    | "none"
    | "presentation"
    | "radiogroup"
    | "tablist"
    | "toolbar"
    | "tree";
}) => {
  const { children, ...data } = props;
  return (
    <div flexy-type="ul" {...data}>
      {children}
    </div>
  );
};

export const OrderedList = (props: {
  children?: React.ReactNode;
  list: string;
  item?: string;
  role:
    | "list"
    | "directory"
    | "group"
    | "listbox"
    | "menu"
    | "menubar"
    | "none"
    | "presentation"
    | "radiogroup"
    | "tablist"
    | "toolbar"
    | "tree";
}) => {
  const { children, ...data } = props;
  return (
    <div flexy-type="ol" {...data}>
      {children}
    </div>
  );
};

export const ListItem = (props: {
  children?: React.ReactNode;
  name: string;
  role:
    | "menuitem"
    | "menuitemcheckbox"
    | "menuitemradio"
    | "option"
    | "none"
    | "presentation"
    | "radio"
    | "separator"
    | "tab"
    | "treeitem";
}) => {
  const { children, ...data } = props;
  return (
    <div flexy-type="li" {...data}>
      {children}
    </div>
  );
};

export const DefinitionList = (props: {
  children?: React.ReactNode;
  name: string;
  role: "group" | "list" | "presentation" | "none";
}) => {
  const { children, ...data } = props;
  return (
    <div flexy-type="dl" {...data}>
      {children}
    </div>
  );
};

export const DefinitionTerm = (props: {
  children?: React.ReactNode;
  name: string;
  role: "term" | "listitem";
}) => {
  const { children, ...data } = props;
  return (
    <div flexy-type="dt" {...data}>
      {children}
    </div>
  );
};

export const DefinitionDescription = (props: {
  children?: React.ReactNode;
  name: string;
}) => {
  const { children, ...data } = props;
  return (
    <div flexy-type="dd" {...data}>
      {children}
    </div>
  );
};

const TextElement =
  (tag: string) =>
  /* eslint-disable react/display-name */
  (props: { children?: React.ReactNode; name: string; role: AriaRole }) => {
    const { children, ...data } = props;
    return (
      <div flexy-type={tag} {...data}>
        {children}
      </div>
    );
  };

export const TextCode = TextElement("code");
export const TextCite = TextElement("cite");
export const TextEmphasis = TextElement("em");
export const TextStrong = TextElement("strong");
export const TextSmall = TextElement("small");
export const TextSubscript = TextElement("sub");
export const TextSuperscript = TextElement("sup");
export const TextSpan = TextElement("span");
export const TextParagraph = TextElement("p");
export const TextPre = TextElement("pre");
export const TextItalic = TextElement("i");
export const TextBold = TextElement("b");
export const TextUnderline = TextElement("u");
export const TextStrikethrough = TextElement("s");
export const TextMark = TextElement("mark");
export const TextWordBreakOpportunity = TextElement("wbr");
export const TextVariable = TextElement("var");
export const TextQuotation = TextElement("q");
export const TextAbbreviation = TextElement("abbr");
export const TextBlockquote = TextElement("blockquote");

export const TextHeading = (props: {
  children?: React.ReactNode;
  name: string;
  role: AriaRole;
  level: 1 | 2 | 3 | 4 | 5 | 6;
}) => {
  const { children, level, ...data } = props;
  return (
    <div flexy-type={`h${level}`} {...data}>
      {children}
    </div>
  );
};

export const TextDeleted = (props: {
  children?: React.ReactNode;
  name: string;
  cite?: string;
  dateTime?: string;
}) => {
  const { children, ...data } = props;
  return (
    <div flexy-type="del" {...data}>
      {children}
    </div>
  );
};

export const TextInserted = (props: {
  children?: React.ReactNode;
  name: string;
  cite?: string;
  dateTime?: string;
}) => {
  const { children, ...data } = props;
  return (
    <div flexy-type="ins" {...data}>
      {children}
    </div>
  );
};

export const TextTime = (props: {
  children?: React.ReactNode;
  name: string;
  dateTime?: string;
}) => {
  const { children, ...data } = props;
  return (
    <div flexy-type="time" {...data}>
      {children}
    </div>
  );
};

export const TextOutput = (props: {
  children?: React.ReactNode;
  name: string;
  for?: string;
  outputName?: string;
}) => {
  const { children, ...data } = props;
  return (
    <div flexy-type="output" {...data}>
      {children}
    </div>
  );
};
