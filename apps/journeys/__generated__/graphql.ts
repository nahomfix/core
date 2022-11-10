/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** DateTime custom scalar */
  DateTime: any;
  join__FieldSet: any;
};

export type Action = {
  gtmEventName?: Maybe<Scalars['String']>;
  parentBlockId: Scalars['ID'];
};

export type Block = {
  id: Scalars['ID'];
  journeyId: Scalars['ID'];
  parentBlockId?: Maybe<Scalars['ID']>;
  parentOrder?: Maybe<Scalars['Int']>;
};

export type Browser = {
  __typename?: 'Browser';
  name?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
};

export type ButtonBlock = Block & {
  __typename?: 'ButtonBlock';
  action?: Maybe<Action>;
  color?: Maybe<ButtonColor>;
  endIconId?: Maybe<Scalars['ID']>;
  id: Scalars['ID'];
  journeyId: Scalars['ID'];
  label: Scalars['String'];
  parentBlockId?: Maybe<Scalars['ID']>;
  parentOrder?: Maybe<Scalars['Int']>;
  size?: Maybe<ButtonSize>;
  startIconId?: Maybe<Scalars['ID']>;
  variant?: Maybe<ButtonVariant>;
};

export type ButtonBlockCreateInput = {
  color?: InputMaybe<ButtonColor>;
  id?: InputMaybe<Scalars['ID']>;
  journeyId: Scalars['ID'];
  label: Scalars['String'];
  parentBlockId: Scalars['ID'];
  size?: InputMaybe<ButtonSize>;
  variant?: InputMaybe<ButtonVariant>;
};

export type ButtonBlockUpdateInput = {
  color?: InputMaybe<ButtonColor>;
  endIconId?: InputMaybe<Scalars['ID']>;
  label?: InputMaybe<Scalars['String']>;
  parentBlockId?: InputMaybe<Scalars['ID']>;
  size?: InputMaybe<ButtonSize>;
  startIconId?: InputMaybe<Scalars['ID']>;
  variant?: InputMaybe<ButtonVariant>;
};

export type ButtonClickEvent = Event & {
  __typename?: 'ButtonClickEvent';
  /** time event was created */
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  /** ID of the journey that the buttonBlock belongs to */
  journeyId: Scalars['ID'];
  /** stepName of the parent stepBlock */
  label?: Maybe<Scalars['String']>;
  /** label of the button */
  value?: Maybe<Scalars['String']>;
};

export type ButtonClickEventCreateInput = {
  blockId: Scalars['ID'];
  /** ID should be unique Event UUID (Provided for optimistic mutation result matching) */
  id?: InputMaybe<Scalars['ID']>;
  /** stepName of the parent stepBlock */
  label?: InputMaybe<Scalars['String']>;
  /** id of the parent stepBlock */
  stepId?: InputMaybe<Scalars['ID']>;
  /** label of the button */
  value?: InputMaybe<Scalars['String']>;
};

export enum ButtonColor {
  error = 'error',
  inherit = 'inherit',
  primary = 'primary',
  secondary = 'secondary'
}

export enum ButtonSize {
  large = 'large',
  medium = 'medium',
  small = 'small'
}

export enum ButtonVariant {
  contained = 'contained',
  text = 'text'
}

export type CardBlock = Block & {
  __typename?: 'CardBlock';
  /** backgroundColor should be a HEX color value e.g #FFFFFF for white. */
  backgroundColor?: Maybe<Scalars['String']>;
  /**
   * coverBlockId is present if a child block should be used as a cover.
   * This child block should not be rendered normally, instead it should be used
   * as a background. Blocks are often of type ImageBlock or VideoBlock.
   */
  coverBlockId?: Maybe<Scalars['ID']>;
  /**
   * fullscreen should control how the coverBlock is displayed. When fullscreen
   * is set to true the coverBlock Image should be displayed as a blur in the
   * background.
   */
  fullscreen: Scalars['Boolean'];
  id: Scalars['ID'];
  journeyId: Scalars['ID'];
  parentBlockId?: Maybe<Scalars['ID']>;
  parentOrder?: Maybe<Scalars['Int']>;
  /**
   * themeMode can override journey themeMode. If nothing is set then use
   * themeMode from journey
   */
  themeMode?: Maybe<ThemeMode>;
  /**
   * themeName can override journey themeName. If nothing is set then use
   * themeName from journey
   */
  themeName?: Maybe<ThemeName>;
};

export type CardBlockCreateInput = {
  backgroundColor?: InputMaybe<Scalars['String']>;
  fullscreen?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['ID']>;
  journeyId: Scalars['ID'];
  parentBlockId: Scalars['ID'];
  themeMode?: InputMaybe<ThemeMode>;
  themeName?: InputMaybe<ThemeName>;
};

export type CardBlockUpdateInput = {
  backgroundColor?: InputMaybe<Scalars['String']>;
  fullscreen?: InputMaybe<Scalars['Boolean']>;
  parentBlockId?: InputMaybe<Scalars['ID']>;
  themeMode?: InputMaybe<ThemeMode>;
  themeName?: InputMaybe<ThemeName>;
};

export type ChatOpenEvent = Event & {
  __typename?: 'ChatOpenEvent';
  /** time event was created */
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  /** ID of the journey that the buttonBlock belongs to */
  journeyId: Scalars['ID'];
  /** null for ChatOpenEvent */
  label?: Maybe<Scalars['String']>;
  /** messagePlatform of the link used for chat (based on the messagePlatform in the value field) */
  messagePlatform?: Maybe<MessagePlatform>;
  /** messagePlatform of the link used for chat */
  value?: Maybe<Scalars['String']>;
};

export type ChatOpenEventCreateInput = {
  blockId: Scalars['ID'];
  /** ID should be unique Event UUID (Provided for optimistic mutation result matching) */
  id?: InputMaybe<Scalars['ID']>;
  /** id of the parent stepBlock */
  stepId?: InputMaybe<Scalars['ID']>;
  /** messagePlatform of the link used for chat */
  value?: InputMaybe<MessagePlatform>;
};

export type Country = {
  __typename?: 'Country';
  continent: Array<Translation>;
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  languages: Array<Language>;
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  name: Array<Translation>;
  population: Scalars['Int'];
  /** slug is a permanent link to the country. It should only be appended, not edited or deleted */
  slug: Array<Translation>;
};


export type CountrycontinentArgs = {
  languageId?: InputMaybe<Scalars['ID']>;
  primary?: InputMaybe<Scalars['Boolean']>;
};


export type CountrynameArgs = {
  languageId?: InputMaybe<Scalars['ID']>;
  primary?: InputMaybe<Scalars['Boolean']>;
};


export type CountryslugArgs = {
  languageId?: InputMaybe<Scalars['ID']>;
  primary?: InputMaybe<Scalars['Boolean']>;
};

export type Device = {
  __typename?: 'Device';
  model?: Maybe<Scalars['String']>;
  type?: Maybe<DeviceType>;
  vendor?: Maybe<Scalars['String']>;
};

export enum DeviceType {
  console = 'console',
  embedded = 'embedded',
  mobile = 'mobile',
  smarttv = 'smarttv',
  tablet = 'tablet',
  wearable = 'wearable'
}

export type Event = {
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  journeyId: Scalars['ID'];
  label?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export enum GridAlignItems {
  baseline = 'baseline',
  center = 'center',
  flexEnd = 'flexEnd',
  flexStart = 'flexStart'
}

export type GridContainerBlock = Block & {
  __typename?: 'GridContainerBlock';
  alignItems: GridAlignItems;
  direction: GridDirection;
  id: Scalars['ID'];
  journeyId: Scalars['ID'];
  justifyContent: GridJustifyContent;
  parentBlockId?: Maybe<Scalars['ID']>;
  parentOrder?: Maybe<Scalars['Int']>;
  spacing: Scalars['Int'];
};

export enum GridDirection {
  column = 'column',
  columnReverse = 'columnReverse',
  row = 'row',
  rowReverse = 'rowReverse'
}

export type GridItemBlock = Block & {
  __typename?: 'GridItemBlock';
  id: Scalars['ID'];
  journeyId: Scalars['ID'];
  lg: Scalars['Int'];
  parentBlockId?: Maybe<Scalars['ID']>;
  parentOrder?: Maybe<Scalars['Int']>;
  sm: Scalars['Int'];
  xl: Scalars['Int'];
};

export enum GridJustifyContent {
  center = 'center',
  flexEnd = 'flexEnd',
  flexStart = 'flexStart'
}

export type IconBlock = Block & {
  __typename?: 'IconBlock';
  color?: Maybe<IconColor>;
  id: Scalars['ID'];
  journeyId: Scalars['ID'];
  name?: Maybe<IconName>;
  parentBlockId?: Maybe<Scalars['ID']>;
  parentOrder?: Maybe<Scalars['Int']>;
  size?: Maybe<IconSize>;
};

export type IconBlockCreateInput = {
  color?: InputMaybe<IconColor>;
  /** ID should be unique Response UUID (Provided for optimistic mutation result matching) */
  id?: InputMaybe<Scalars['ID']>;
  journeyId: Scalars['ID'];
  name?: InputMaybe<IconName>;
  parentBlockId: Scalars['ID'];
  size?: InputMaybe<IconSize>;
};

export type IconBlockUpdateInput = {
  color?: InputMaybe<IconColor>;
  name?: InputMaybe<IconName>;
  size?: InputMaybe<IconSize>;
};

export enum IconColor {
  action = 'action',
  disabled = 'disabled',
  error = 'error',
  inherit = 'inherit',
  primary = 'primary',
  secondary = 'secondary'
}

/** IconName is equivalent to the icons found in @mui/icons-material */
export enum IconName {
  ArrowBackRounded = 'ArrowBackRounded',
  ArrowForwardRounded = 'ArrowForwardRounded',
  BeenhereRounded = 'BeenhereRounded',
  ChatBubbleOutlineRounded = 'ChatBubbleOutlineRounded',
  CheckCircleRounded = 'CheckCircleRounded',
  ChevronLeftRounded = 'ChevronLeftRounded',
  ChevronRightRounded = 'ChevronRightRounded',
  ContactSupportRounded = 'ContactSupportRounded',
  FormatQuoteRounded = 'FormatQuoteRounded',
  LiveTvRounded = 'LiveTvRounded',
  LockOpenRounded = 'LockOpenRounded',
  MenuBookRounded = 'MenuBookRounded',
  PlayArrowRounded = 'PlayArrowRounded',
  RadioButtonUncheckedRounded = 'RadioButtonUncheckedRounded',
  SendRounded = 'SendRounded',
  SubscriptionsRounded = 'SubscriptionsRounded',
  TranslateRounded = 'TranslateRounded'
}

export enum IconSize {
  inherit = 'inherit',
  lg = 'lg',
  md = 'md',
  sm = 'sm',
  xl = 'xl'
}

export enum IdType {
  databaseId = 'databaseId',
  slug = 'slug'
}

export type ImageBlock = Block & {
  __typename?: 'ImageBlock';
  alt: Scalars['String'];
  /**
   * blurhash is a compact representation of a placeholder for an image.
   * Find a frontend implementation at https://github.com/woltapp/blurhash
   */
  blurhash: Scalars['String'];
  height: Scalars['Int'];
  id: Scalars['ID'];
  journeyId: Scalars['ID'];
  parentBlockId?: Maybe<Scalars['ID']>;
  parentOrder?: Maybe<Scalars['Int']>;
  src?: Maybe<Scalars['String']>;
  width: Scalars['Int'];
};

export type ImageBlockCreateInput = {
  alt: Scalars['String'];
  blurhash?: InputMaybe<Scalars['String']>;
  /** ID should be unique Response UUID (Provided for optimistic mutation result matching) */
  id?: InputMaybe<Scalars['ID']>;
  /** True if the coverBlockId in a parent block should be set to this block's id. */
  isCover?: InputMaybe<Scalars['Boolean']>;
  journeyId: Scalars['ID'];
  parentBlockId: Scalars['ID'];
  src?: InputMaybe<Scalars['String']>;
};

export type ImageBlockUpdateInput = {
  alt?: InputMaybe<Scalars['String']>;
  parentBlockId?: InputMaybe<Scalars['ID']>;
  src?: InputMaybe<Scalars['String']>;
};

export type Journey = {
  __typename?: 'Journey';
  archivedAt?: Maybe<Scalars['DateTime']>;
  blocks?: Maybe<Array<Block>>;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  featuredAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  language: Language;
  primaryImageBlock?: Maybe<ImageBlock>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  seoDescription?: Maybe<Scalars['String']>;
  seoTitle?: Maybe<Scalars['String']>;
  slug: Scalars['String'];
  status: JourneyStatus;
  template?: Maybe<Scalars['Boolean']>;
  themeMode: ThemeMode;
  themeName: ThemeName;
  title: Scalars['String'];
  trashedAt?: Maybe<Scalars['DateTime']>;
  userJourneys?: Maybe<Array<UserJourney>>;
};

export type JourneyCreateInput = {
  description?: InputMaybe<Scalars['String']>;
  /**
   * ID should be unique Response UUID
   * (Provided for optimistic mutation result matching)
   */
  id?: InputMaybe<Scalars['ID']>;
  languageId: Scalars['String'];
  /**
   * Slug should be unique amongst all journeys
   * (server will throw BAD_USER_INPUT error if not)
   * If not required will use title formatted with kebab-case
   * If the generated slug is not unique the uuid will be placed
   * at the end of the slug guaranteeing uniqueness
   */
  slug?: InputMaybe<Scalars['String']>;
  themeMode?: InputMaybe<ThemeMode>;
  themeName?: InputMaybe<ThemeName>;
  title: Scalars['String'];
};

export enum JourneyStatus {
  archived = 'archived',
  deleted = 'deleted',
  draft = 'draft',
  published = 'published',
  trashed = 'trashed'
}

export type JourneyTemplateInput = {
  template?: InputMaybe<Scalars['Boolean']>;
};

export type JourneyUpdateInput = {
  description?: InputMaybe<Scalars['String']>;
  languageId?: InputMaybe<Scalars['String']>;
  primaryImageBlockId?: InputMaybe<Scalars['ID']>;
  seoDescription?: InputMaybe<Scalars['String']>;
  seoTitle?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  themeMode?: InputMaybe<ThemeMode>;
  themeName?: InputMaybe<ThemeName>;
  title?: InputMaybe<Scalars['String']>;
};

export type JourneyViewEvent = Event & {
  __typename?: 'JourneyViewEvent';
  /** time event was created */
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  /** ID of the journey being viewed */
  journeyId: Scalars['ID'];
  /** title of the journey being viewed */
  label?: Maybe<Scalars['String']>;
  /** language of the journey being viewed (based on the ID in the value field) */
  language?: Maybe<Language>;
  /** languageId of the journey being viewed */
  value?: Maybe<Scalars['String']>;
};

export type JourneyViewEventCreateInput = {
  /** ID should be unique Event UUID (Provided for optimistic mutation result matching) */
  id?: InputMaybe<Scalars['ID']>;
  journeyId: Scalars['ID'];
  /** title of the journey being viewed */
  label?: InputMaybe<Scalars['String']>;
  /** languageId of the journey being viewed */
  value?: InputMaybe<Scalars['ID']>;
};

export type JourneysFilter = {
  featured?: InputMaybe<Scalars['Boolean']>;
  template?: InputMaybe<Scalars['Boolean']>;
};

export enum JourneysReportType {
  multipleFull = 'multipleFull',
  multipleSummary = 'multipleSummary',
  singleFull = 'singleFull',
  singleSummary = 'singleSummary'
}

export type Language = {
  __typename?: 'Language';
  bcp47?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  iso3?: Maybe<Scalars['String']>;
  name: Array<Translation>;
};


export type LanguagenameArgs = {
  languageId?: InputMaybe<Scalars['ID']>;
  primary?: InputMaybe<Scalars['Boolean']>;
};

export enum LanguageIdType {
  bcp47 = 'bcp47',
  databaseId = 'databaseId'
}

export type LinkAction = Action & {
  __typename?: 'LinkAction';
  gtmEventName?: Maybe<Scalars['String']>;
  parentBlockId: Scalars['ID'];
  target?: Maybe<Scalars['String']>;
  url: Scalars['String'];
};

export type LinkActionInput = {
  gtmEventName?: InputMaybe<Scalars['String']>;
  target?: InputMaybe<Scalars['String']>;
  url: Scalars['String'];
};

export enum MessagePlatform {
  facebook = 'facebook',
  instagram = 'instagram',
  line = 'line',
  skype = 'skype',
  snapchat = 'snapchat',
  telegram = 'telegram',
  tikTok = 'tikTok',
  viber = 'viber',
  vk = 'vk',
  whatsApp = 'whatsApp'
}

export type Mutation = {
  __typename?: 'Mutation';
  /** blockDelete returns the updated sibling blocks on successful delete */
  blockDelete: Array<Block>;
  blockDeleteAction: Block;
  /** blockDuplicate returns the updated block, it's children and sibling blocks on successful duplicate */
  blockDuplicate: Array<Block>;
  blockOrderUpdate: Array<Block>;
  blockUpdateLinkAction: LinkAction;
  blockUpdateNavigateAction: NavigateAction;
  blockUpdateNavigateToBlockAction: NavigateToBlockAction;
  blockUpdateNavigateToJourneyAction: NavigateToJourneyAction;
  buttonBlockCreate: ButtonBlock;
  buttonBlockUpdate?: Maybe<ButtonBlock>;
  buttonClickEventCreate: ButtonClickEvent;
  cardBlockCreate: CardBlock;
  cardBlockUpdate: CardBlock;
  chatOpenEventCreate: ChatOpenEvent;
  iconBlockCreate: IconBlock;
  iconBlockUpdate: IconBlock;
  imageBlockCreate: ImageBlock;
  imageBlockUpdate: ImageBlock;
  journeyCreate: Journey;
  journeyDuplicate: Journey;
  /** Sets journey status to published */
  journeyPublish?: Maybe<Journey>;
  /** Updates template */
  journeyTemplate: Journey;
  journeyUpdate: Journey;
  journeyViewEventCreate: JourneyViewEvent;
  /** Sets journeys statuses to archived */
  journeysArchive?: Maybe<Array<Maybe<Journey>>>;
  /** Sets journeys statuses to deleted */
  journeysDelete?: Maybe<Array<Maybe<Journey>>>;
  /** Sets journeys statuses to last active status */
  journeysRestore?: Maybe<Array<Maybe<Journey>>>;
  /** Sets journeys statuses to trashed */
  journeysTrash?: Maybe<Array<Maybe<Journey>>>;
  radioOptionBlockCreate: RadioOptionBlock;
  radioOptionBlockUpdate: RadioOptionBlock;
  radioQuestionBlockCreate: RadioQuestionBlock;
  radioQuestionBlockUpdate: RadioQuestionBlock;
  radioQuestionSubmissionEventCreate: RadioQuestionSubmissionEvent;
  signUpBlockCreate: SignUpBlock;
  signUpBlockUpdate?: Maybe<SignUpBlock>;
  signUpSubmissionEventCreate: SignUpSubmissionEvent;
  stepBlockCreate: StepBlock;
  stepBlockUpdate: StepBlock;
  stepNextEventCreate: StepNextEvent;
  stepViewEventCreate: StepViewEvent;
  textResponseBlockCreate: TextResponseBlock;
  textResponseBlockUpdate?: Maybe<TextResponseBlock>;
  textResponseSubmissionEventCreate: TextResponseSubmissionEvent;
  typographyBlockCreate: TypographyBlock;
  typographyBlockUpdate: TypographyBlock;
  userJourneyApprove: UserJourney;
  userJourneyPromote: UserJourney;
  userJourneyRemove: UserJourney;
  /** Removes all userJourneys associated with a journeyId */
  userJourneyRemoveAll: Array<UserJourney>;
  userJourneyRequest: UserJourney;
  videoBlockCreate: VideoBlock;
  videoBlockUpdate: VideoBlock;
  videoCollapseEventCreate: VideoCollapseEvent;
  videoCompleteEventCreate: VideoCompleteEvent;
  videoExpandEventCreate: VideoExpandEvent;
  videoPauseEventCreate: VideoPauseEvent;
  videoPlayEventCreate: VideoPlayEvent;
  videoProgressEventCreate: VideoProgressEvent;
  videoStartEventCreate: VideoStartEvent;
  /** Update a visitor */
  visitorUpdate: Visitor;
};


export type MutationblockDeleteArgs = {
  id: Scalars['ID'];
  journeyId: Scalars['ID'];
  parentBlockId?: InputMaybe<Scalars['ID']>;
};


export type MutationblockDeleteActionArgs = {
  id: Scalars['ID'];
  journeyId: Scalars['ID'];
};


export type MutationblockDuplicateArgs = {
  id: Scalars['ID'];
  journeyId: Scalars['ID'];
  parentOrder?: InputMaybe<Scalars['Int']>;
};


export type MutationblockOrderUpdateArgs = {
  id: Scalars['ID'];
  journeyId: Scalars['ID'];
  parentOrder: Scalars['Int'];
};


export type MutationblockUpdateLinkActionArgs = {
  id: Scalars['ID'];
  input: LinkActionInput;
  journeyId: Scalars['ID'];
};


export type MutationblockUpdateNavigateActionArgs = {
  id: Scalars['ID'];
  input: NavigateActionInput;
  journeyId: Scalars['ID'];
};


export type MutationblockUpdateNavigateToBlockActionArgs = {
  id: Scalars['ID'];
  input: NavigateToBlockActionInput;
  journeyId: Scalars['ID'];
};


export type MutationblockUpdateNavigateToJourneyActionArgs = {
  id: Scalars['ID'];
  input: NavigateToJourneyActionInput;
  journeyId: Scalars['ID'];
};


export type MutationbuttonBlockCreateArgs = {
  input: ButtonBlockCreateInput;
};


export type MutationbuttonBlockUpdateArgs = {
  id: Scalars['ID'];
  input: ButtonBlockUpdateInput;
  journeyId: Scalars['ID'];
};


export type MutationbuttonClickEventCreateArgs = {
  input: ButtonClickEventCreateInput;
};


export type MutationcardBlockCreateArgs = {
  input: CardBlockCreateInput;
};


export type MutationcardBlockUpdateArgs = {
  id: Scalars['ID'];
  input: CardBlockUpdateInput;
  journeyId: Scalars['ID'];
};


export type MutationchatOpenEventCreateArgs = {
  input: ChatOpenEventCreateInput;
};


export type MutationiconBlockCreateArgs = {
  input: IconBlockCreateInput;
};


export type MutationiconBlockUpdateArgs = {
  id: Scalars['ID'];
  input: IconBlockUpdateInput;
  journeyId: Scalars['ID'];
};


export type MutationimageBlockCreateArgs = {
  input: ImageBlockCreateInput;
};


export type MutationimageBlockUpdateArgs = {
  id: Scalars['ID'];
  input: ImageBlockUpdateInput;
  journeyId: Scalars['ID'];
};


export type MutationjourneyCreateArgs = {
  input: JourneyCreateInput;
};


export type MutationjourneyDuplicateArgs = {
  id: Scalars['ID'];
};


export type MutationjourneyPublishArgs = {
  id: Scalars['ID'];
};


export type MutationjourneyTemplateArgs = {
  id: Scalars['ID'];
  input: JourneyTemplateInput;
};


export type MutationjourneyUpdateArgs = {
  id: Scalars['ID'];
  input: JourneyUpdateInput;
};


export type MutationjourneyViewEventCreateArgs = {
  input: JourneyViewEventCreateInput;
};


export type MutationjourneysArchiveArgs = {
  ids: Array<Scalars['ID']>;
};


export type MutationjourneysDeleteArgs = {
  ids: Array<Scalars['ID']>;
};


export type MutationjourneysRestoreArgs = {
  ids: Array<Scalars['ID']>;
};


export type MutationjourneysTrashArgs = {
  ids: Array<Scalars['ID']>;
};


export type MutationradioOptionBlockCreateArgs = {
  input: RadioOptionBlockCreateInput;
};


export type MutationradioOptionBlockUpdateArgs = {
  id: Scalars['ID'];
  input: RadioOptionBlockUpdateInput;
  journeyId: Scalars['ID'];
};


export type MutationradioQuestionBlockCreateArgs = {
  input: RadioQuestionBlockCreateInput;
};


export type MutationradioQuestionBlockUpdateArgs = {
  id: Scalars['ID'];
  journeyId: Scalars['ID'];
  parentBlockId: Scalars['ID'];
};


export type MutationradioQuestionSubmissionEventCreateArgs = {
  input: RadioQuestionSubmissionEventCreateInput;
};


export type MutationsignUpBlockCreateArgs = {
  input: SignUpBlockCreateInput;
};


export type MutationsignUpBlockUpdateArgs = {
  id: Scalars['ID'];
  input: SignUpBlockUpdateInput;
  journeyId: Scalars['ID'];
};


export type MutationsignUpSubmissionEventCreateArgs = {
  input: SignUpSubmissionEventCreateInput;
};


export type MutationstepBlockCreateArgs = {
  input: StepBlockCreateInput;
};


export type MutationstepBlockUpdateArgs = {
  id: Scalars['ID'];
  input: StepBlockUpdateInput;
  journeyId: Scalars['ID'];
};


export type MutationstepNextEventCreateArgs = {
  input: StepNextEventCreateInput;
};


export type MutationstepViewEventCreateArgs = {
  input: StepViewEventCreateInput;
};


export type MutationtextResponseBlockCreateArgs = {
  input: TextResponseBlockCreateInput;
};


export type MutationtextResponseBlockUpdateArgs = {
  id: Scalars['ID'];
  input: TextResponseBlockUpdateInput;
  journeyId: Scalars['ID'];
};


export type MutationtextResponseSubmissionEventCreateArgs = {
  input: TextResponseSubmissionEventCreateInput;
};


export type MutationtypographyBlockCreateArgs = {
  input: TypographyBlockCreateInput;
};


export type MutationtypographyBlockUpdateArgs = {
  id: Scalars['ID'];
  input: TypographyBlockUpdateInput;
  journeyId: Scalars['ID'];
};


export type MutationuserJourneyApproveArgs = {
  id: Scalars['ID'];
};


export type MutationuserJourneyPromoteArgs = {
  id: Scalars['ID'];
};


export type MutationuserJourneyRemoveArgs = {
  id: Scalars['ID'];
};


export type MutationuserJourneyRemoveAllArgs = {
  id: Scalars['ID'];
};


export type MutationuserJourneyRequestArgs = {
  idType?: InputMaybe<IdType>;
  journeyId: Scalars['ID'];
};


export type MutationvideoBlockCreateArgs = {
  input: VideoBlockCreateInput;
};


export type MutationvideoBlockUpdateArgs = {
  id: Scalars['ID'];
  input: VideoBlockUpdateInput;
  journeyId: Scalars['ID'];
};


export type MutationvideoCollapseEventCreateArgs = {
  input: VideoCollapseEventCreateInput;
};


export type MutationvideoCompleteEventCreateArgs = {
  input: VideoCompleteEventCreateInput;
};


export type MutationvideoExpandEventCreateArgs = {
  input: VideoExpandEventCreateInput;
};


export type MutationvideoPauseEventCreateArgs = {
  input: VideoPauseEventCreateInput;
};


export type MutationvideoPlayEventCreateArgs = {
  input: VideoPlayEventCreateInput;
};


export type MutationvideoProgressEventCreateArgs = {
  input: VideoProgressEventCreateInput;
};


export type MutationvideoStartEventCreateArgs = {
  input: VideoStartEventCreateInput;
};


export type MutationvisitorUpdateArgs = {
  id: Scalars['ID'];
  input: VisitorUpdateInput;
};

/**
 * NavigateAction is an Action that navigates to the nextBlockId field set on the
 * closest ancestor StepBlock.
 */
export type NavigateAction = Action & {
  __typename?: 'NavigateAction';
  gtmEventName?: Maybe<Scalars['String']>;
  parentBlockId: Scalars['ID'];
};

export type NavigateActionInput = {
  gtmEventName?: InputMaybe<Scalars['String']>;
};

export type NavigateToBlockAction = Action & {
  __typename?: 'NavigateToBlockAction';
  blockId: Scalars['String'];
  gtmEventName?: Maybe<Scalars['String']>;
  parentBlockId: Scalars['ID'];
};

export type NavigateToBlockActionInput = {
  blockId: Scalars['String'];
  gtmEventName?: InputMaybe<Scalars['String']>;
};

export type NavigateToJourneyAction = Action & {
  __typename?: 'NavigateToJourneyAction';
  gtmEventName?: Maybe<Scalars['String']>;
  journey?: Maybe<Journey>;
  journeyId: Scalars['String'];
  parentBlockId: Scalars['ID'];
};

export type NavigateToJourneyActionInput = {
  gtmEventName?: InputMaybe<Scalars['String']>;
  journeyId: Scalars['String'];
};

export type OperatingSystem = {
  __typename?: 'OperatingSystem';
  name?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

export type PowerBiEmbed = {
  __typename?: 'PowerBiEmbed';
  /** The embed token */
  accessToken: Scalars['String'];
  /** The embed URL of the report */
  embedUrl: Scalars['String'];
  /** The date and time (UTC) of token expiration */
  expiration: Scalars['String'];
  /** The report ID */
  reportId: Scalars['String'];
  /** The name of the report */
  reportName: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  adminJourney?: Maybe<Journey>;
  adminJourneys: Array<Journey>;
  adminJourneysReport?: Maybe<PowerBiEmbed>;
  countries: Array<Country>;
  country: Country;
  episodes: Array<Video>;
  getUserRole?: Maybe<UserRole>;
  journey?: Maybe<Journey>;
  journeys: Array<Journey>;
  language?: Maybe<Language>;
  languages: Array<Language>;
  me?: Maybe<User>;
  video: Video;
  videoTag?: Maybe<VideoTag>;
  videoTags?: Maybe<Array<VideoTag>>;
  videos: Array<Video>;
  /** Get a single visitor */
  visitor: Visitor;
  /** A list of visitors that are connected with a specific team. */
  visitorsConnection: VisitorsConnection;
};


export type QueryadminJourneyArgs = {
  id: Scalars['ID'];
  idType?: InputMaybe<IdType>;
};


export type QueryadminJourneysArgs = {
  status?: InputMaybe<Array<JourneyStatus>>;
  template?: InputMaybe<Scalars['Boolean']>;
};


export type QueryadminJourneysReportArgs = {
  reportType: JourneysReportType;
};


export type QuerycountryArgs = {
  id: Scalars['ID'];
  idType?: InputMaybe<IdType>;
};


export type QueryepisodesArgs = {
  idType?: InputMaybe<IdType>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  playlistId: Scalars['ID'];
  where?: InputMaybe<VideosFilter>;
};


export type QueryjourneyArgs = {
  id: Scalars['ID'];
  idType?: InputMaybe<IdType>;
};


export type QueryjourneysArgs = {
  where?: InputMaybe<JourneysFilter>;
};


export type QuerylanguageArgs = {
  id: Scalars['ID'];
  idType?: InputMaybe<LanguageIdType>;
};


export type QuerylanguagesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryvideoArgs = {
  id: Scalars['ID'];
  idType?: InputMaybe<IdType>;
};


export type QueryvideoTagArgs = {
  id: Scalars['ID'];
};


export type QueryvideosArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<VideosFilter>;
};


export type QueryvisitorArgs = {
  id: Scalars['ID'];
};


export type QueryvisitorsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  teamId: Scalars['String'];
};

export type RadioOptionBlock = Block & {
  __typename?: 'RadioOptionBlock';
  action?: Maybe<Action>;
  id: Scalars['ID'];
  journeyId: Scalars['ID'];
  label: Scalars['String'];
  parentBlockId?: Maybe<Scalars['ID']>;
  parentOrder?: Maybe<Scalars['Int']>;
};

export type RadioOptionBlockCreateInput = {
  id?: InputMaybe<Scalars['ID']>;
  journeyId: Scalars['ID'];
  label: Scalars['String'];
  parentBlockId: Scalars['ID'];
};

export type RadioOptionBlockUpdateInput = {
  label?: InputMaybe<Scalars['String']>;
  parentBlockId?: InputMaybe<Scalars['ID']>;
};

export type RadioQuestionBlock = Block & {
  __typename?: 'RadioQuestionBlock';
  id: Scalars['ID'];
  journeyId: Scalars['ID'];
  parentBlockId?: Maybe<Scalars['ID']>;
  parentOrder?: Maybe<Scalars['Int']>;
};

export type RadioQuestionBlockCreateInput = {
  id?: InputMaybe<Scalars['ID']>;
  journeyId: Scalars['ID'];
  parentBlockId: Scalars['ID'];
};

export type RadioQuestionSubmissionEvent = Event & {
  __typename?: 'RadioQuestionSubmissionEvent';
  /** time event was created */
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  /** ID of the journey that the radioQuestionBlock belongs to */
  journeyId: Scalars['ID'];
  /** stepName of the parent stepBlock */
  label?: Maybe<Scalars['String']>;
  /** label of the selected radioOptionBlock */
  value?: Maybe<Scalars['String']>;
};

export type RadioQuestionSubmissionEventCreateInput = {
  blockId: Scalars['ID'];
  /** ID should be unique Event UUID (Provided for optimistic mutation result matching) */
  id?: InputMaybe<Scalars['ID']>;
  /** stepName of the parent stepBlock */
  label?: InputMaybe<Scalars['String']>;
  radioOptionBlockId: Scalars['ID'];
  /** id of the parent stepBlock */
  stepId?: InputMaybe<Scalars['ID']>;
  /** label of the selected radioOption block */
  value?: InputMaybe<Scalars['String']>;
};

export enum Role {
  /**
   * User can create templates and
   * add them to template library
   */
  publisher = 'publisher'
}

export type SignUpBlock = Block & {
  __typename?: 'SignUpBlock';
  action?: Maybe<Action>;
  id: Scalars['ID'];
  journeyId: Scalars['ID'];
  parentBlockId?: Maybe<Scalars['ID']>;
  parentOrder?: Maybe<Scalars['Int']>;
  submitIconId?: Maybe<Scalars['ID']>;
  submitLabel?: Maybe<Scalars['String']>;
};

export type SignUpBlockCreateInput = {
  id?: InputMaybe<Scalars['ID']>;
  journeyId: Scalars['ID'];
  parentBlockId: Scalars['ID'];
  submitLabel: Scalars['String'];
};

export type SignUpBlockUpdateInput = {
  parentBlockId?: InputMaybe<Scalars['ID']>;
  submitIconId?: InputMaybe<Scalars['ID']>;
  submitLabel?: InputMaybe<Scalars['String']>;
};

export type SignUpSubmissionEvent = Event & {
  __typename?: 'SignUpSubmissionEvent';
  /** time event was created */
  createdAt: Scalars['DateTime'];
  /** email from the signUpBlock form */
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** ID of the journey that the block belongs to */
  journeyId: Scalars['ID'];
  /** null for signUpSubmissionEvent */
  label?: Maybe<Scalars['String']>;
  /** name from the signUpBlock form */
  value?: Maybe<Scalars['String']>;
};

export type SignUpSubmissionEventCreateInput = {
  blockId: Scalars['ID'];
  /** email from the signUpBlock form */
  email: Scalars['String'];
  /** ID should be unique Event UUID (Provided for optimistic mutation result matching) */
  id?: InputMaybe<Scalars['ID']>;
  /** name from the signUpBlock form */
  name: Scalars['String'];
  /** id of the parent stepBlock */
  stepId?: InputMaybe<Scalars['ID']>;
};

export type StepBlock = Block & {
  __typename?: 'StepBlock';
  id: Scalars['ID'];
  journeyId: Scalars['ID'];
  /**
   * locked will be set to true if the user should not be able to manually
   * advance to the next step.
   */
  locked: Scalars['Boolean'];
  /**
   * nextBlockId contains the preferred block to navigate to when a
   * NavigateAction occurs or if the user manually tries to advance to the next
   * step. If no nextBlockId is set it will automatically navigate to the next
   * step in the journey based on parentOrder.
   */
  nextBlockId?: Maybe<Scalars['ID']>;
  parentBlockId?: Maybe<Scalars['ID']>;
  parentOrder?: Maybe<Scalars['Int']>;
};

export type StepBlockCreateInput = {
  id?: InputMaybe<Scalars['ID']>;
  journeyId: Scalars['ID'];
  locked?: InputMaybe<Scalars['Boolean']>;
  nextBlockId?: InputMaybe<Scalars['ID']>;
};

export type StepBlockUpdateInput = {
  locked?: InputMaybe<Scalars['Boolean']>;
  nextBlockId?: InputMaybe<Scalars['ID']>;
};

export type StepNextEvent = Event & {
  __typename?: 'StepNextEvent';
  /** time event was created */
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  /** ID of the journey that the stepBlock belongs to */
  journeyId: Scalars['ID'];
  /** stepName of the stepBlock */
  label?: Maybe<Scalars['String']>;
  /** stepName of the next stepBlock */
  value?: Maybe<Scalars['String']>;
};

export type StepNextEventCreateInput = {
  blockId: Scalars['ID'];
  /** ID should be unique Event UUID (Provided for optimistic mutation result matching) */
  id?: InputMaybe<Scalars['ID']>;
  /** stepName of the stepBlock */
  label?: InputMaybe<Scalars['String']>;
  /** id of the mext stepBlock */
  nextStepId: Scalars['ID'];
  /** stepName of the next stepBlock */
  value?: InputMaybe<Scalars['String']>;
};

export type StepViewEvent = Event & {
  __typename?: 'StepViewEvent';
  /** time event was created */
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  /** ID of the journey that the stepBlock belongs to */
  journeyId: Scalars['ID'];
  /** null for stepViewEvent */
  label?: Maybe<Scalars['String']>;
  /** stepName of the stepBlock */
  value?: Maybe<Scalars['String']>;
};

export type StepViewEventCreateInput = {
  blockId: Scalars['ID'];
  /** ID should be unique Event UUID (Provided for optimistic mutation result matching) */
  id?: InputMaybe<Scalars['ID']>;
  /** stepName of the stepBlock */
  value?: InputMaybe<Scalars['String']>;
};

export type TextResponseBlock = Block & {
  __typename?: 'TextResponseBlock';
  action?: Maybe<Action>;
  hint?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  journeyId: Scalars['ID'];
  label: Scalars['String'];
  minRows?: Maybe<Scalars['Int']>;
  parentBlockId?: Maybe<Scalars['ID']>;
  parentOrder?: Maybe<Scalars['Int']>;
  submitIconId?: Maybe<Scalars['ID']>;
  submitLabel?: Maybe<Scalars['String']>;
};

export type TextResponseBlockCreateInput = {
  id?: InputMaybe<Scalars['ID']>;
  journeyId: Scalars['ID'];
  label: Scalars['String'];
  parentBlockId: Scalars['ID'];
  submitLabel: Scalars['String'];
};

export type TextResponseBlockUpdateInput = {
  hint?: InputMaybe<Scalars['String']>;
  label?: InputMaybe<Scalars['String']>;
  minRows?: InputMaybe<Scalars['Int']>;
  parentBlockId?: InputMaybe<Scalars['ID']>;
  submitIconId?: InputMaybe<Scalars['ID']>;
  submitLabel?: InputMaybe<Scalars['String']>;
};

export type TextResponseSubmissionEvent = Event & {
  __typename?: 'TextResponseSubmissionEvent';
  /** time event was created */
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  /** ID of the journey that the buttonBlock belongs to */
  journeyId: Scalars['ID'];
  /** stepName of the parent stepBlock */
  label?: Maybe<Scalars['String']>;
  /** response from the TextResponseBlock form */
  value?: Maybe<Scalars['String']>;
};

export type TextResponseSubmissionEventCreateInput = {
  blockId: Scalars['ID'];
  /** ID should be unique Event UUID (Provided for optimistic mutation result matching) */
  id?: InputMaybe<Scalars['ID']>;
  /** stepName of the parent stepBlock */
  label?: InputMaybe<Scalars['String']>;
  /** id of the parent stepBlock */
  stepId?: InputMaybe<Scalars['ID']>;
  /** response from the TextResponseBlock form */
  value: Scalars['String'];
};

export enum ThemeMode {
  dark = 'dark',
  light = 'light'
}

export enum ThemeName {
  base = 'base'
}

export type Translation = {
  __typename?: 'Translation';
  language: Language;
  primary: Scalars['Boolean'];
  value: Scalars['String'];
};

export enum TypographyAlign {
  center = 'center',
  left = 'left',
  right = 'right'
}

export type TypographyBlock = Block & {
  __typename?: 'TypographyBlock';
  align?: Maybe<TypographyAlign>;
  color?: Maybe<TypographyColor>;
  content: Scalars['String'];
  id: Scalars['ID'];
  journeyId: Scalars['ID'];
  parentBlockId?: Maybe<Scalars['ID']>;
  parentOrder?: Maybe<Scalars['Int']>;
  variant?: Maybe<TypographyVariant>;
};

export type TypographyBlockCreateInput = {
  align?: InputMaybe<TypographyAlign>;
  color?: InputMaybe<TypographyColor>;
  content: Scalars['String'];
  id?: InputMaybe<Scalars['ID']>;
  journeyId: Scalars['ID'];
  parentBlockId: Scalars['ID'];
  variant?: InputMaybe<TypographyVariant>;
};

export type TypographyBlockUpdateInput = {
  align?: InputMaybe<TypographyAlign>;
  color?: InputMaybe<TypographyColor>;
  content?: InputMaybe<Scalars['String']>;
  parentBlockId?: InputMaybe<Scalars['ID']>;
  variant?: InputMaybe<TypographyVariant>;
};

export enum TypographyColor {
  error = 'error',
  primary = 'primary',
  secondary = 'secondary'
}

export enum TypographyVariant {
  body1 = 'body1',
  body2 = 'body2',
  caption = 'caption',
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4',
  h5 = 'h5',
  h6 = 'h6',
  overline = 'overline',
  subtitle1 = 'subtitle1',
  subtitle2 = 'subtitle2'
}

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  imageUrl?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
};

/** These types are a subset provided by the @types/ua-parser-js library. */
export type UserAgent = {
  __typename?: 'UserAgent';
  browser: Browser;
  device: Device;
  os: OperatingSystem;
};

export type UserJourney = {
  __typename?: 'UserJourney';
  id: Scalars['ID'];
  journey?: Maybe<Journey>;
  journeyId: Scalars['ID'];
  role: UserJourneyRole;
  user?: Maybe<User>;
  userId: Scalars['ID'];
};

export enum UserJourneyRole {
  editor = 'editor',
  inviteRequested = 'inviteRequested',
  owner = 'owner'
}

export type UserRole = {
  __typename?: 'UserRole';
  id: Scalars['ID'];
  roles?: Maybe<Array<Role>>;
  userId: Scalars['ID'];
};

export type Video = {
  __typename?: 'Video';
  description: Array<Translation>;
  /** Episodes are child videos, currently only found in a playlist type */
  episodeIds: Array<Scalars['ID']>;
  episodes: Array<Video>;
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  imageAlt: Array<Translation>;
  noIndex?: Maybe<Scalars['Boolean']>;
  primaryLanguageId: Scalars['ID'];
  seoTitle: Array<Translation>;
  /** slug is a permanent link to the video. It should only be appended, not edited or deleted */
  slug: Array<Translation>;
  snippet: Array<Translation>;
  studyQuestions: Array<Translation>;
  title: Array<Translation>;
  type: VideoType;
  variant?: Maybe<VideoVariant>;
  variantLanguages: Array<Language>;
};


export type VideodescriptionArgs = {
  languageId?: InputMaybe<Scalars['ID']>;
  primary?: InputMaybe<Scalars['Boolean']>;
};


export type VideoimageAltArgs = {
  languageId?: InputMaybe<Scalars['ID']>;
  primary?: InputMaybe<Scalars['Boolean']>;
};


export type VideoseoTitleArgs = {
  languageId?: InputMaybe<Scalars['ID']>;
  primary?: InputMaybe<Scalars['Boolean']>;
};


export type VideoslugArgs = {
  languageId?: InputMaybe<Scalars['ID']>;
  primary?: InputMaybe<Scalars['Boolean']>;
};


export type VideosnippetArgs = {
  languageId?: InputMaybe<Scalars['ID']>;
  primary?: InputMaybe<Scalars['Boolean']>;
};


export type VideostudyQuestionsArgs = {
  languageId?: InputMaybe<Scalars['ID']>;
  primary?: InputMaybe<Scalars['Boolean']>;
};


export type VideotitleArgs = {
  languageId?: InputMaybe<Scalars['ID']>;
  primary?: InputMaybe<Scalars['Boolean']>;
};


export type VideovariantArgs = {
  languageId?: InputMaybe<Scalars['ID']>;
};

export type VideoBlock = Block & {
  __typename?: 'VideoBlock';
  /** action that should be performed when the video ends */
  action?: Maybe<Action>;
  autoplay?: Maybe<Scalars['Boolean']>;
  /**
   * internal source videos: this field is not populated and instead only present
   * in the video field
   * For other sources this is automatically populated.
   */
  description?: Maybe<Scalars['String']>;
  /**
   * internal source videos: this field is not populated and instead only present
   * in the video field
   * For other sources this is automatically populated.
   * duration in seconds.
   */
  duration?: Maybe<Scalars['Int']>;
  /** endAt dictates at which point of time the video should end */
  endAt?: Maybe<Scalars['Int']>;
  fullsize?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  /**
   * internal source videos: this field is not populated and instead only present
   * in the video field
   * For other sources this is automatically populated.
   */
  image?: Maybe<Scalars['String']>;
  journeyId: Scalars['ID'];
  muted?: Maybe<Scalars['Boolean']>;
  parentBlockId?: Maybe<Scalars['ID']>;
  parentOrder?: Maybe<Scalars['Int']>;
  /**
   * posterBlockId is present if a child block should be used as a poster.
   * This child block should not be rendered normally, instead it should be used
   * as the video poster. PosterBlock should be of type ImageBlock.
   */
  posterBlockId?: Maybe<Scalars['ID']>;
  /**
   * internal source: videoId, videoVariantLanguageId, and video present
   * youTube source: videoId, title, description, and duration present
   */
  source: VideoBlockSource;
  /** startAt dictates at which point of time the video should start playing */
  startAt?: Maybe<Scalars['Int']>;
  /**
   * internal source videos: this field is not populated and instead only present
   * in the video field.
   * For other sources this is automatically populated.
   */
  title?: Maybe<Scalars['String']>;
  /**
   * internal source videos: video is only populated when videoID and
   * videoVariantLanguageId are present
   */
  video?: Maybe<Video>;
  /**
   * internal source videos: videoId and videoVariantLanguageId both need to be set
   * to select a video.
   * For other sources only videoId needs to be set.
   */
  videoId?: Maybe<Scalars['ID']>;
  /**
   * internal source videos: videoId and videoVariantLanguageId both need to be set
   * to select a video.
   * For other sources only videoId needs to be set.
   */
  videoVariantLanguageId?: Maybe<Scalars['ID']>;
};

export type VideoBlockCreateInput = {
  autoplay?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  /** endAt dictates at which point of time the video should end */
  endAt?: InputMaybe<Scalars['Int']>;
  fullsize?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['ID']>;
  /** True if the coverBlockId in a parent block should be set to this block's id. */
  isCover?: InputMaybe<Scalars['Boolean']>;
  journeyId: Scalars['ID'];
  muted?: InputMaybe<Scalars['Boolean']>;
  parentBlockId: Scalars['ID'];
  /**
   * posterBlockId is present if a child block should be used as a poster.
   * This child block should not be rendered normally, instead it should be used
   * as the video poster. PosterBlock should be of type ImageBlock.
   */
  posterBlockId?: InputMaybe<Scalars['ID']>;
  /**
   * internal source: videoId and videoVariantLanguageId required
   * youTube source: videoId required
   */
  source?: InputMaybe<VideoBlockSource>;
  /** startAt dictates at which point of time the video should start playing */
  startAt?: InputMaybe<Scalars['Int']>;
  /**
   * internal source videos: videoId and videoVariantLanguageId both need to be set
   * to select a video.
   * For other sources only videoId needs to be set.
   */
  videoId?: InputMaybe<Scalars['ID']>;
  /**
   * internal source videos: videoId and videoVariantLanguageId both need to be set
   * to select a video.
   * For other sources only videoId needs to be set.
   */
  videoVariantLanguageId?: InputMaybe<Scalars['ID']>;
};

export enum VideoBlockSource {
  internal = 'internal',
  youTube = 'youTube'
}

export type VideoBlockUpdateInput = {
  autoplay?: InputMaybe<Scalars['Boolean']>;
  /** endAt dictates at which point of time the video should end */
  endAt?: InputMaybe<Scalars['Int']>;
  fullsize?: InputMaybe<Scalars['Boolean']>;
  muted?: InputMaybe<Scalars['Boolean']>;
  /**
   * posterBlockId is present if a child block should be used as a poster.
   * This child block should not be rendered normally, instead it should be used
   * as the video poster. PosterBlock should be of type ImageBlock.
   */
  posterBlockId?: InputMaybe<Scalars['ID']>;
  /**
   * internal source: videoId and videoVariantLanguageId required
   * youTube source: videoId required
   */
  source?: InputMaybe<VideoBlockSource>;
  /** startAt dictates at which point of time the video should start playing */
  startAt?: InputMaybe<Scalars['Int']>;
  /**
   * internal source videos: videoId and videoVariantLanguageId both need to be set
   * to select a video.
   * For other sources only videoId needs to be set.
   */
  videoId?: InputMaybe<Scalars['ID']>;
  /**
   * internal source videos: videoId and videoVariantLanguageId both need to be set
   * to select a video.
   * For other sources only videoId needs to be set.
   */
  videoVariantLanguageId?: InputMaybe<Scalars['ID']>;
};

export type VideoCollapseEvent = Event & {
  __typename?: 'VideoCollapseEvent';
  /** time event was created */
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  /** ID of the journey that the videoBlock belongs to */
  journeyId: Scalars['ID'];
  /** title of the video */
  label?: Maybe<Scalars['String']>;
  /** duration of the video played when the VideoCollapseEvent is triggered */
  position?: Maybe<Scalars['Float']>;
  /** source of the video (based on the source in the value field) */
  source?: Maybe<VideoBlockSource>;
  /** source of the video */
  value?: Maybe<Scalars['String']>;
};

export type VideoCollapseEventCreateInput = {
  blockId: Scalars['ID'];
  /** ID should be unique Event UUID (Provided for optimistic mutation result matching) */
  id?: InputMaybe<Scalars['ID']>;
  /** title of the video */
  label?: InputMaybe<Scalars['String']>;
  /** duration of the video played when the VideoCollapseEvent is triggered */
  position?: InputMaybe<Scalars['Float']>;
  /** id of the parent stepBlock */
  stepId?: InputMaybe<Scalars['ID']>;
  /** source of the video */
  value?: InputMaybe<VideoBlockSource>;
};

export type VideoCompleteEvent = Event & {
  __typename?: 'VideoCompleteEvent';
  /** time event was created */
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  /** ID of the journey that the videoBlock belongs to */
  journeyId: Scalars['ID'];
  /** title of the video */
  label?: Maybe<Scalars['String']>;
  /** duration of the video played when the VideoCompleteEvent is triggered */
  position?: Maybe<Scalars['Float']>;
  /** source of the video (based on the source in the value field) */
  source?: Maybe<VideoBlockSource>;
  /** source of the video */
  value?: Maybe<Scalars['String']>;
};

export type VideoCompleteEventCreateInput = {
  blockId: Scalars['ID'];
  /** ID should be unique Event UUID (Provided for optimistic mutation result matching) */
  id?: InputMaybe<Scalars['ID']>;
  /** title of the video */
  label?: InputMaybe<Scalars['String']>;
  /** duration of the video played when the VideoCompleteEvent is triggered */
  position?: InputMaybe<Scalars['Float']>;
  /** id of the parent stepBlock */
  stepId?: InputMaybe<Scalars['ID']>;
  /** source of the video */
  value?: InputMaybe<VideoBlockSource>;
};

export type VideoExpandEvent = Event & {
  __typename?: 'VideoExpandEvent';
  /** time event was created */
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  /** ID of the journey that the videoBlock belongs to */
  journeyId: Scalars['ID'];
  /** title of the video */
  label?: Maybe<Scalars['String']>;
  /** duration of the video played when the VideoExpandEvent is triggered */
  position?: Maybe<Scalars['Float']>;
  /** source of the video (based on the source in the value field) */
  source?: Maybe<VideoBlockSource>;
  /** source of the video */
  value?: Maybe<Scalars['String']>;
};

export type VideoExpandEventCreateInput = {
  blockId: Scalars['ID'];
  /** ID should be unique Event UUID (Provided for optimistic mutation result matching) */
  id?: InputMaybe<Scalars['ID']>;
  /** title of the video */
  label?: InputMaybe<Scalars['String']>;
  /** duration of the video played when the VideoExpandEvent is triggered */
  position?: InputMaybe<Scalars['Float']>;
  /** id of the parent stepBlock */
  stepId?: InputMaybe<Scalars['ID']>;
  /** source of the video */
  value?: InputMaybe<VideoBlockSource>;
};

export type VideoPauseEvent = Event & {
  __typename?: 'VideoPauseEvent';
  /** time event was created */
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  /** ID of the journey that the videoBlock belongs to */
  journeyId: Scalars['ID'];
  /** title of the video */
  label?: Maybe<Scalars['String']>;
  /** duration of the video played when the VideoPauseEvent is triggered */
  position?: Maybe<Scalars['Float']>;
  /** source of the video (based on the source in the value field) */
  source?: Maybe<VideoBlockSource>;
  /** source of the video */
  value?: Maybe<Scalars['String']>;
};

export type VideoPauseEventCreateInput = {
  blockId: Scalars['ID'];
  /** ID should be unique Event UUID (Provided for optimistic mutation result matching) */
  id?: InputMaybe<Scalars['ID']>;
  /** title of the video */
  label?: InputMaybe<Scalars['String']>;
  /** duration of the video played when the VideoPauseEvent is triggered */
  position?: InputMaybe<Scalars['Float']>;
  /** id of the parent stepBlock */
  stepId?: InputMaybe<Scalars['ID']>;
  /** source of the video */
  value?: InputMaybe<VideoBlockSource>;
};

export type VideoPlayEvent = Event & {
  __typename?: 'VideoPlayEvent';
  /** time event was created */
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  /** ID of the journey that the videoBlock belongs to */
  journeyId: Scalars['ID'];
  /** title of the video */
  label?: Maybe<Scalars['String']>;
  /** duration of the video played when the VideoPlayEvent is triggered */
  position?: Maybe<Scalars['Float']>;
  /** source of the video (based on the source in the value field) */
  source?: Maybe<VideoBlockSource>;
  /** source of the video */
  value?: Maybe<Scalars['String']>;
};

export type VideoPlayEventCreateInput = {
  blockId: Scalars['ID'];
  /** ID should be unique Event UUID (Provided for optimistic mutation result matching) */
  id?: InputMaybe<Scalars['ID']>;
  /** title of the video */
  label?: InputMaybe<Scalars['String']>;
  /** duration of the video played when the VideoPlayEvent is triggered */
  position?: InputMaybe<Scalars['Float']>;
  /** id of the parent stepBlock */
  stepId?: InputMaybe<Scalars['ID']>;
  /** source of the video */
  value?: InputMaybe<VideoBlockSource>;
};

export type VideoProgressEvent = Event & {
  __typename?: 'VideoProgressEvent';
  /** time event was created */
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  /** ID of the journey that the videoBlock belongs to */
  journeyId: Scalars['ID'];
  /** title of the video */
  label?: Maybe<Scalars['String']>;
  /** duration of the video played when the VideoProgressEvent is triggered */
  position?: Maybe<Scalars['Float']>;
  /** progress is a integer indicating the precentage completion from the startAt to the endAt times of the videoBlock */
  progress: Scalars['Int'];
  /** source of the video (based on the source in the value field) */
  source?: Maybe<VideoBlockSource>;
  /** source of the video */
  value?: Maybe<Scalars['String']>;
};

export type VideoProgressEventCreateInput = {
  blockId: Scalars['ID'];
  /** ID should be unique Event UUID (Provided for optimistic mutation result matching) */
  id?: InputMaybe<Scalars['ID']>;
  /** title of the video */
  label?: InputMaybe<Scalars['String']>;
  /** duration of the video played when the VideoProgressEvent is triggered */
  position?: InputMaybe<Scalars['Float']>;
  /** progress is a integer indicating the precentage completion from the startAt to the endAt times of the videoBlock */
  progress: Scalars['Int'];
  /** id of the parent stepBlock */
  stepId?: InputMaybe<Scalars['ID']>;
  /** source of the video */
  value?: InputMaybe<VideoBlockSource>;
};

export type VideoStartEvent = Event & {
  __typename?: 'VideoStartEvent';
  /** time event was created */
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  /** ID of the journey that the videoBlock belongs to */
  journeyId: Scalars['ID'];
  /** title of the video */
  label?: Maybe<Scalars['String']>;
  /** duration of the video played when the VideoStartEvent is triggered */
  position?: Maybe<Scalars['Float']>;
  /** source of the video (based on the source in the value field) */
  source?: Maybe<VideoBlockSource>;
  /** source of the video */
  value?: Maybe<Scalars['String']>;
};

export type VideoStartEventCreateInput = {
  blockId: Scalars['ID'];
  /** ID should be unique Event UUID (Provided for optimistic mutation result matching) */
  id?: InputMaybe<Scalars['ID']>;
  /** title of the video */
  label?: InputMaybe<Scalars['String']>;
  /** duration of the video played when the VideoStartEvent is triggered */
  position?: InputMaybe<Scalars['Float']>;
  /** id of the parent stepBlock */
  stepId?: InputMaybe<Scalars['ID']>;
  /** source of the video */
  value?: InputMaybe<VideoBlockSource>;
};

export type VideoTag = {
  __typename?: 'VideoTag';
  id: Scalars['ID'];
  title: Array<Translation>;
};


export type VideoTagtitleArgs = {
  languageId?: InputMaybe<Scalars['ID']>;
  primary?: InputMaybe<Scalars['Boolean']>;
};

/**
 * VideoTriggerBlock is a block that indicates the video to navigate
 * to the next block at the designated time.
 */
export type VideoTriggerBlock = Block & {
  __typename?: 'VideoTriggerBlock';
  action: Action;
  id: Scalars['ID'];
  journeyId: Scalars['ID'];
  parentBlockId?: Maybe<Scalars['ID']>;
  parentOrder?: Maybe<Scalars['Int']>;
  /**
   * triggerStart sets the time as to when a video navigates to the next block,
   * this is the number of seconds since the start of the video
   */
  triggerStart: Scalars['Int'];
};

export enum VideoType {
  episode = 'episode',
  playlist = 'playlist',
  standalone = 'standalone'
}

export type VideoVariant = {
  __typename?: 'VideoVariant';
  downloads: Array<VideoVariantDownload>;
  duration: Scalars['Int'];
  hls?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  language: Language;
  subtitle: Array<Translation>;
};


export type VideoVariantsubtitleArgs = {
  languageId?: InputMaybe<Scalars['ID']>;
  primary?: InputMaybe<Scalars['Boolean']>;
};

export type VideoVariantDownload = {
  __typename?: 'VideoVariantDownload';
  quality: VideoVariantDownloadQuality;
  size: Scalars['Float'];
  url: Scalars['String'];
};

export enum VideoVariantDownloadQuality {
  high = 'high',
  low = 'low'
}

export type VideosFilter = {
  availableVariantLanguageIds?: InputMaybe<Array<Scalars['ID']>>;
  tagId?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  types?: InputMaybe<Array<VideoType>>;
};

/** A visitor with attributes connected to a team. */
export type Visitor = {
  __typename?: 'Visitor';
  /**
   * The country code of the visitor as poulated by visitor ip address detected in
   * the JourneyViewEventCreate mutation. This field country code is converted
   * from an IP address by the @maxmind/geoip2-node library. If this field is empty
   * it is likely that the JourneyViewEventCreate mutation was not called by the
   * visitor or that the country was not able to be determined based on the
   * visitor IP address.
   */
  countryCode?: Maybe<Scalars['String']>;
  /**
   * The time when the visitor created their first event on a journey connected
   * to the requested team.
   */
  createdAt: Scalars['DateTime'];
  /**
   * The email address of the visitor as populated by VisitorUpdate mutation or
   * SignUpEventSubmissionEventCreate mutation.
   */
  email?: Maybe<Scalars['String']>;
  events: Array<Event>;
  id: Scalars['ID'];
  /**
   * The last time the visitor called the ButtonClickEvent mutation where the url
   * is in the format of a recognized chat platform.
   */
  lastChatStartedAt?: Maybe<Scalars['DateTime']>;
  /**
   * Message platform the visitor wishes to be connected to us on as populated by
   * VisitorUpdate mutation or ChatOpenEventCreate mutation.
   */
  messagePlatform?: Maybe<MessagePlatform>;
  /**
   * ID of the visitor as set by VisitorUpdate mutation. This could be a phone
   * number, user id or other unique identifier provided by the message platform.
   */
  messagePlatformId?: Maybe<Scalars['String']>;
  /**
   * The name of the visitor as populated by VisitorUpdate mutation or
   * SignUpEventSubmissionEventCreate mutation.
   */
  name?: Maybe<Scalars['String']>;
  /** Private notes of the visitor as set by VisitorUpdate mutation. */
  notes?: Maybe<Scalars['String']>;
  /** Status of the visitor as populated by VisitorUpdate mutation. */
  status?: Maybe<VisitorStatus>;
  /**
   * The user agent of the visitor as poulated by the visitor's user-agent string
   * detected in the JourneyViewEventCreate mutation. This field is enriched
   * by data from the ua-parser-js library. If this field is empty it is likely
   * that the JourneyViewEventCreate mutation was not called by the visitor.
   */
  userAgent?: Maybe<UserAgent>;
};

/** An edge in a connection. */
export type VisitorEdge = {
  __typename?: 'VisitorEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Visitor;
};

/**
 * The status of a visitor according to team members interacting with the
 * visitor admin interface. This enum should map to an emoji when displayed
 * (names here match Apple's emoji name)
 */
export enum VisitorStatus {
  checkMarkSymbol = 'checkMarkSymbol',
  partyPopper = 'partyPopper',
  prohibited = 'prohibited',
  redExclamationMark = 'redExclamationMark',
  redQuestionMark = 'redQuestionMark',
  robotFace = 'robotFace',
  star = 'star',
  thumbsDown = 'thumbsDown',
  thumbsUp = 'thumbsUp',
  warning = 'warning'
}

/** A list of fields to update a visitor when calling the visitorUpdate mutation */
export type VisitorUpdateInput = {
  /**
   * The email address of the visitor (will prevent
   * SignUpEventSubmissionEventCreate mutation from updating this field
   * automatically)
   */
  email?: InputMaybe<Scalars['String']>;
  /**
   * Message platform the visitor wishes to be connected to us on (will prevent
   * ChatOpenEventCreate mutation from updating this field automatically)
   */
  messagePlatform?: InputMaybe<MessagePlatform>;
  /**
   * ID of the visitor. This could be a phone number, user id or other unique
   * identifier provided by the message platform.
   */
  messagePlatformId?: InputMaybe<Scalars['String']>;
  /**
   * The name of the visitor (will prevent SignUpEventSubmissionEventCreate
   * mutation from updating this field automatically)
   */
  name?: InputMaybe<Scalars['String']>;
  /**
   * Private notes relating to the visitor. This information is never made public
   * and only accessible by team members.
   */
  notes?: InputMaybe<Scalars['String']>;
  /** Status of the visitor. */
  status?: InputMaybe<VisitorStatus>;
};

/** A list of visitors connected with a team. */
export type VisitorsConnection = {
  __typename?: 'VisitorsConnection';
  /** A list of edges. */
  edges: Array<VisitorEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export enum join__Graph {
  JOURNEYS = 'JOURNEYS',
  LANGUAGES = 'LANGUAGES',
  USERS = 'USERS',
  VIDEOS = 'VIDEOS'
}

export type GetJourneyQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetJourneyQuery = { __typename?: 'Query', journey?: (
    { __typename?: 'Journey' }
    & { ' $fragmentRefs'?: { 'JourneyFieldsFragment': JourneyFieldsFragment } }
  ) | null };

export type GetJourneySlugsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetJourneySlugsQuery = { __typename?: 'Query', journeys: Array<{ __typename?: 'Journey', slug: string }> };

export type GetJourneysQueryVariables = Exact<{ [key: string]: never; }>;


export type GetJourneysQuery = { __typename?: 'Query', journeys: Array<{ __typename?: 'Journey', id: string, title: string, slug: string }> };

export type JourneyViewEventCreateMutationVariables = Exact<{
  input: JourneyViewEventCreateInput;
}>;


export type JourneyViewEventCreateMutation = { __typename?: 'Mutation', journeyViewEventCreate: { __typename?: 'JourneyViewEvent', id: string } };

export type ButtonClickEventCreateMutationVariables = Exact<{
  input: ButtonClickEventCreateInput;
}>;


export type ButtonClickEventCreateMutation = { __typename?: 'Mutation', buttonClickEventCreate: { __typename?: 'ButtonClickEvent', id: string } };

export type ChatOpenEventCreateMutationVariables = Exact<{
  input: ChatOpenEventCreateInput;
}>;


export type ChatOpenEventCreateMutation = { __typename?: 'Mutation', chatOpenEventCreate: { __typename?: 'ChatOpenEvent', id: string } };

export type ButtonFieldsFragment = { __typename?: 'ButtonBlock', id: string, parentBlockId?: string | null, parentOrder?: number | null, label: string, size?: ButtonSize | null, startIconId?: string | null, endIconId?: string | null, buttonVariant?: ButtonVariant | null, buttonColor?: ButtonColor | null, action?: (
    { __typename?: 'LinkAction' }
    & { ' $fragmentRefs'?: { 'ActionFields_LinkAction_Fragment': ActionFields_LinkAction_Fragment } }
  ) | (
    { __typename?: 'NavigateAction' }
    & { ' $fragmentRefs'?: { 'ActionFields_NavigateAction_Fragment': ActionFields_NavigateAction_Fragment } }
  ) | (
    { __typename?: 'NavigateToBlockAction' }
    & { ' $fragmentRefs'?: { 'ActionFields_NavigateToBlockAction_Fragment': ActionFields_NavigateToBlockAction_Fragment } }
  ) | (
    { __typename?: 'NavigateToJourneyAction' }
    & { ' $fragmentRefs'?: { 'ActionFields_NavigateToJourneyAction_Fragment': ActionFields_NavigateToJourneyAction_Fragment } }
  ) | null } & { ' $fragmentName'?: 'ButtonFieldsFragment' };

export type CardFieldsFragment = { __typename?: 'CardBlock', id: string, parentBlockId?: string | null, parentOrder?: number | null, backgroundColor?: string | null, coverBlockId?: string | null, themeMode?: ThemeMode | null, themeName?: ThemeName | null, fullscreen: boolean } & { ' $fragmentName'?: 'CardFieldsFragment' };

export type GridContainerFieldsFragment = { __typename?: 'GridContainerBlock', id: string, parentBlockId?: string | null, parentOrder?: number | null, spacing: number, direction: GridDirection, justifyContent: GridJustifyContent, alignItems: GridAlignItems } & { ' $fragmentName'?: 'GridContainerFieldsFragment' };

export type GridItemFieldsFragment = { __typename?: 'GridItemBlock', id: string, parentBlockId?: string | null, parentOrder?: number | null, xl: number, lg: number, sm: number } & { ' $fragmentName'?: 'GridItemFieldsFragment' };

export type IconFieldsFragment = { __typename?: 'IconBlock', id: string, parentBlockId?: string | null, parentOrder?: number | null, iconName?: IconName | null, iconSize?: IconSize | null, iconColor?: IconColor | null } & { ' $fragmentName'?: 'IconFieldsFragment' };

export type ImageFieldsFragment = { __typename?: 'ImageBlock', id: string, parentBlockId?: string | null, parentOrder?: number | null, src?: string | null, alt: string, width: number, height: number, blurhash: string } & { ' $fragmentName'?: 'ImageFieldsFragment' };

export type RadioOptionFieldsFragment = { __typename?: 'RadioOptionBlock', id: string, parentBlockId?: string | null, parentOrder?: number | null, label: string, action?: (
    { __typename?: 'LinkAction' }
    & { ' $fragmentRefs'?: { 'ActionFields_LinkAction_Fragment': ActionFields_LinkAction_Fragment } }
  ) | (
    { __typename?: 'NavigateAction' }
    & { ' $fragmentRefs'?: { 'ActionFields_NavigateAction_Fragment': ActionFields_NavigateAction_Fragment } }
  ) | (
    { __typename?: 'NavigateToBlockAction' }
    & { ' $fragmentRefs'?: { 'ActionFields_NavigateToBlockAction_Fragment': ActionFields_NavigateToBlockAction_Fragment } }
  ) | (
    { __typename?: 'NavigateToJourneyAction' }
    & { ' $fragmentRefs'?: { 'ActionFields_NavigateToJourneyAction_Fragment': ActionFields_NavigateToJourneyAction_Fragment } }
  ) | null } & { ' $fragmentName'?: 'RadioOptionFieldsFragment' };

export type RadioQuestionSubmissionEventCreateMutationVariables = Exact<{
  input: RadioQuestionSubmissionEventCreateInput;
}>;


export type RadioQuestionSubmissionEventCreateMutation = { __typename?: 'Mutation', radioQuestionSubmissionEventCreate: { __typename?: 'RadioQuestionSubmissionEvent', id: string } };

export type RadioQuestionFieldsFragment = { __typename?: 'RadioQuestionBlock', id: string, parentBlockId?: string | null, parentOrder?: number | null } & { ' $fragmentName'?: 'RadioQuestionFieldsFragment' };

export type SignUpSubmissionEventCreateMutationVariables = Exact<{
  input: SignUpSubmissionEventCreateInput;
}>;


export type SignUpSubmissionEventCreateMutation = { __typename?: 'Mutation', signUpSubmissionEventCreate: { __typename?: 'SignUpSubmissionEvent', id: string } };

export type SignUpFieldsFragment = { __typename?: 'SignUpBlock', id: string, parentBlockId?: string | null, parentOrder?: number | null, submitLabel?: string | null, submitIconId?: string | null, action?: (
    { __typename?: 'LinkAction' }
    & { ' $fragmentRefs'?: { 'ActionFields_LinkAction_Fragment': ActionFields_LinkAction_Fragment } }
  ) | (
    { __typename?: 'NavigateAction' }
    & { ' $fragmentRefs'?: { 'ActionFields_NavigateAction_Fragment': ActionFields_NavigateAction_Fragment } }
  ) | (
    { __typename?: 'NavigateToBlockAction' }
    & { ' $fragmentRefs'?: { 'ActionFields_NavigateToBlockAction_Fragment': ActionFields_NavigateToBlockAction_Fragment } }
  ) | (
    { __typename?: 'NavigateToJourneyAction' }
    & { ' $fragmentRefs'?: { 'ActionFields_NavigateToJourneyAction_Fragment': ActionFields_NavigateToJourneyAction_Fragment } }
  ) | null } & { ' $fragmentName'?: 'SignUpFieldsFragment' };

export type StepViewEventCreateMutationVariables = Exact<{
  input: StepViewEventCreateInput;
}>;


export type StepViewEventCreateMutation = { __typename?: 'Mutation', stepViewEventCreate: { __typename?: 'StepViewEvent', id: string } };

export type StepFieldsFragment = { __typename?: 'StepBlock', id: string, parentBlockId?: string | null, parentOrder?: number | null, locked: boolean, nextBlockId?: string | null } & { ' $fragmentName'?: 'StepFieldsFragment' };

export type TextResponseSubmissionEventCreateMutationVariables = Exact<{
  input: TextResponseSubmissionEventCreateInput;
}>;


export type TextResponseSubmissionEventCreateMutation = { __typename?: 'Mutation', textResponseSubmissionEventCreate: { __typename?: 'TextResponseSubmissionEvent', id: string } };

export type TextResponseFieldsFragment = { __typename?: 'TextResponseBlock', id: string, parentBlockId?: string | null, parentOrder?: number | null, label: string, hint?: string | null, minRows?: number | null, submitLabel?: string | null, submitIconId?: string | null, action?: (
    { __typename?: 'LinkAction' }
    & { ' $fragmentRefs'?: { 'ActionFields_LinkAction_Fragment': ActionFields_LinkAction_Fragment } }
  ) | (
    { __typename?: 'NavigateAction' }
    & { ' $fragmentRefs'?: { 'ActionFields_NavigateAction_Fragment': ActionFields_NavigateAction_Fragment } }
  ) | (
    { __typename?: 'NavigateToBlockAction' }
    & { ' $fragmentRefs'?: { 'ActionFields_NavigateToBlockAction_Fragment': ActionFields_NavigateToBlockAction_Fragment } }
  ) | (
    { __typename?: 'NavigateToJourneyAction' }
    & { ' $fragmentRefs'?: { 'ActionFields_NavigateToJourneyAction_Fragment': ActionFields_NavigateToJourneyAction_Fragment } }
  ) | null } & { ' $fragmentName'?: 'TextResponseFieldsFragment' };

export type TypographyFieldsFragment = { __typename?: 'TypographyBlock', id: string, parentBlockId?: string | null, parentOrder?: number | null, align?: TypographyAlign | null, color?: TypographyColor | null, content: string, variant?: TypographyVariant | null } & { ' $fragmentName'?: 'TypographyFieldsFragment' };

export type VideoFieldsFragment = { __typename?: 'VideoBlock', id: string, parentBlockId?: string | null, parentOrder?: number | null, muted?: boolean | null, autoplay?: boolean | null, startAt?: number | null, endAt?: number | null, posterBlockId?: string | null, fullsize?: boolean | null, videoId?: string | null, videoVariantLanguageId?: string | null, source: VideoBlockSource, title?: string | null, description?: string | null, image?: string | null, duration?: number | null, video?: { __typename?: 'Video', id: string, image?: string | null, title: Array<{ __typename?: 'Translation', value: string }>, variant?: { __typename?: 'VideoVariant', id: string, hls?: string | null } | null } | null, action?: (
    { __typename?: 'LinkAction' }
    & { ' $fragmentRefs'?: { 'ActionFields_LinkAction_Fragment': ActionFields_LinkAction_Fragment } }
  ) | (
    { __typename?: 'NavigateAction' }
    & { ' $fragmentRefs'?: { 'ActionFields_NavigateAction_Fragment': ActionFields_NavigateAction_Fragment } }
  ) | (
    { __typename?: 'NavigateToBlockAction' }
    & { ' $fragmentRefs'?: { 'ActionFields_NavigateToBlockAction_Fragment': ActionFields_NavigateToBlockAction_Fragment } }
  ) | (
    { __typename?: 'NavigateToJourneyAction' }
    & { ' $fragmentRefs'?: { 'ActionFields_NavigateToJourneyAction_Fragment': ActionFields_NavigateToJourneyAction_Fragment } }
  ) | null } & { ' $fragmentName'?: 'VideoFieldsFragment' };

export type VideoStartEventCreateMutationVariables = Exact<{
  input: VideoStartEventCreateInput;
}>;


export type VideoStartEventCreateMutation = { __typename?: 'Mutation', videoStartEventCreate: { __typename?: 'VideoStartEvent', id: string } };

export type VideoPlayEventCreateMutationVariables = Exact<{
  input: VideoPlayEventCreateInput;
}>;


export type VideoPlayEventCreateMutation = { __typename?: 'Mutation', videoPlayEventCreate: { __typename?: 'VideoPlayEvent', id: string } };

export type VideoPauseEventCreateMutationVariables = Exact<{
  input: VideoPauseEventCreateInput;
}>;


export type VideoPauseEventCreateMutation = { __typename?: 'Mutation', videoPauseEventCreate: { __typename?: 'VideoPauseEvent', id: string } };

export type VideoCompleteEventCreateMutationVariables = Exact<{
  input: VideoCompleteEventCreateInput;
}>;


export type VideoCompleteEventCreateMutation = { __typename?: 'Mutation', videoCompleteEventCreate: { __typename?: 'VideoCompleteEvent', id: string } };

export type VideoExpandEventCreateMutationVariables = Exact<{
  input: VideoExpandEventCreateInput;
}>;


export type VideoExpandEventCreateMutation = { __typename?: 'Mutation', videoExpandEventCreate: { __typename?: 'VideoExpandEvent', id: string } };

export type VideoCollapseEventCreateMutationVariables = Exact<{
  input: VideoCollapseEventCreateInput;
}>;


export type VideoCollapseEventCreateMutation = { __typename?: 'Mutation', videoCollapseEventCreate: { __typename?: 'VideoCollapseEvent', id: string } };

export type VideoProgressEventCreateMutationVariables = Exact<{
  input: VideoProgressEventCreateInput;
}>;


export type VideoProgressEventCreateMutation = { __typename?: 'Mutation', videoProgressEventCreate: { __typename?: 'VideoProgressEvent', id: string } };

export type VideoTriggerFieldsFragment = { __typename?: 'VideoTriggerBlock', id: string, parentBlockId?: string | null, triggerStart: number, triggerAction: (
    { __typename?: 'LinkAction' }
    & { ' $fragmentRefs'?: { 'ActionFields_LinkAction_Fragment': ActionFields_LinkAction_Fragment } }
  ) | (
    { __typename?: 'NavigateAction' }
    & { ' $fragmentRefs'?: { 'ActionFields_NavigateAction_Fragment': ActionFields_NavigateAction_Fragment } }
  ) | (
    { __typename?: 'NavigateToBlockAction' }
    & { ' $fragmentRefs'?: { 'ActionFields_NavigateToBlockAction_Fragment': ActionFields_NavigateToBlockAction_Fragment } }
  ) | (
    { __typename?: 'NavigateToJourneyAction' }
    & { ' $fragmentRefs'?: { 'ActionFields_NavigateToJourneyAction_Fragment': ActionFields_NavigateToJourneyAction_Fragment } }
  ) } & { ' $fragmentName'?: 'VideoTriggerFieldsFragment' };

export type JourneyFieldsFragment = { __typename?: 'Journey', id: string, slug: string, title: string, description?: string | null, status: JourneyStatus, createdAt: any, publishedAt?: any | null, themeName: ThemeName, themeMode: ThemeMode, seoTitle?: string | null, seoDescription?: string | null, template?: boolean | null, language: { __typename?: 'Language', id: string, bcp47?: string | null, iso3?: string | null, name: Array<{ __typename?: 'Translation', value: string, primary: boolean }> }, blocks?: Array<(
    { __typename?: 'ButtonBlock' }
    & { ' $fragmentRefs'?: { 'BlockFields_ButtonBlock_Fragment': BlockFields_ButtonBlock_Fragment } }
  ) | (
    { __typename?: 'CardBlock' }
    & { ' $fragmentRefs'?: { 'BlockFields_CardBlock_Fragment': BlockFields_CardBlock_Fragment } }
  ) | (
    { __typename?: 'GridContainerBlock' }
    & { ' $fragmentRefs'?: { 'BlockFields_GridContainerBlock_Fragment': BlockFields_GridContainerBlock_Fragment } }
  ) | (
    { __typename?: 'GridItemBlock' }
    & { ' $fragmentRefs'?: { 'BlockFields_GridItemBlock_Fragment': BlockFields_GridItemBlock_Fragment } }
  ) | (
    { __typename?: 'IconBlock' }
    & { ' $fragmentRefs'?: { 'BlockFields_IconBlock_Fragment': BlockFields_IconBlock_Fragment } }
  ) | (
    { __typename?: 'ImageBlock' }
    & { ' $fragmentRefs'?: { 'BlockFields_ImageBlock_Fragment': BlockFields_ImageBlock_Fragment } }
  ) | (
    { __typename?: 'RadioOptionBlock' }
    & { ' $fragmentRefs'?: { 'BlockFields_RadioOptionBlock_Fragment': BlockFields_RadioOptionBlock_Fragment } }
  ) | (
    { __typename?: 'RadioQuestionBlock' }
    & { ' $fragmentRefs'?: { 'BlockFields_RadioQuestionBlock_Fragment': BlockFields_RadioQuestionBlock_Fragment } }
  ) | (
    { __typename?: 'SignUpBlock' }
    & { ' $fragmentRefs'?: { 'BlockFields_SignUpBlock_Fragment': BlockFields_SignUpBlock_Fragment } }
  ) | (
    { __typename?: 'StepBlock' }
    & { ' $fragmentRefs'?: { 'BlockFields_StepBlock_Fragment': BlockFields_StepBlock_Fragment } }
  ) | (
    { __typename?: 'TextResponseBlock' }
    & { ' $fragmentRefs'?: { 'BlockFields_TextResponseBlock_Fragment': BlockFields_TextResponseBlock_Fragment } }
  ) | (
    { __typename?: 'TypographyBlock' }
    & { ' $fragmentRefs'?: { 'BlockFields_TypographyBlock_Fragment': BlockFields_TypographyBlock_Fragment } }
  ) | (
    { __typename?: 'VideoBlock' }
    & { ' $fragmentRefs'?: { 'BlockFields_VideoBlock_Fragment': BlockFields_VideoBlock_Fragment } }
  ) | (
    { __typename?: 'VideoTriggerBlock' }
    & { ' $fragmentRefs'?: { 'BlockFields_VideoTriggerBlock_Fragment': BlockFields_VideoTriggerBlock_Fragment } }
  )> | null, primaryImageBlock?: (
    { __typename?: 'ImageBlock' }
    & { ' $fragmentRefs'?: { 'ImageFieldsFragment': ImageFieldsFragment } }
  ) | null, userJourneys?: Array<{ __typename?: 'UserJourney', id: string, role: UserJourneyRole, user?: { __typename?: 'User', id: string, firstName: string, lastName?: string | null, imageUrl?: string | null } | null }> | null } & { ' $fragmentName'?: 'JourneyFieldsFragment' };

type ActionFields_LinkAction_Fragment = { __typename?: 'LinkAction', url: string, parentBlockId: string, gtmEventName?: string | null } & { ' $fragmentName'?: 'ActionFields_LinkAction_Fragment' };

type ActionFields_NavigateAction_Fragment = { __typename?: 'NavigateAction', parentBlockId: string, gtmEventName?: string | null } & { ' $fragmentName'?: 'ActionFields_NavigateAction_Fragment' };

type ActionFields_NavigateToBlockAction_Fragment = { __typename?: 'NavigateToBlockAction', blockId: string, parentBlockId: string, gtmEventName?: string | null } & { ' $fragmentName'?: 'ActionFields_NavigateToBlockAction_Fragment' };

type ActionFields_NavigateToJourneyAction_Fragment = { __typename?: 'NavigateToJourneyAction', parentBlockId: string, gtmEventName?: string | null, journey?: { __typename?: 'Journey', id: string, slug: string, language: { __typename?: 'Language', bcp47?: string | null } } | null } & { ' $fragmentName'?: 'ActionFields_NavigateToJourneyAction_Fragment' };

export type ActionFieldsFragment = ActionFields_LinkAction_Fragment | ActionFields_NavigateAction_Fragment | ActionFields_NavigateToBlockAction_Fragment | ActionFields_NavigateToJourneyAction_Fragment;

type BlockFields_ButtonBlock_Fragment = (
  { __typename?: 'ButtonBlock', id: string, parentBlockId?: string | null, parentOrder?: number | null }
  & { ' $fragmentRefs'?: { 'ButtonFieldsFragment': ButtonFieldsFragment } }
) & { ' $fragmentName'?: 'BlockFields_ButtonBlock_Fragment' };

type BlockFields_CardBlock_Fragment = (
  { __typename?: 'CardBlock', id: string, parentBlockId?: string | null, parentOrder?: number | null }
  & { ' $fragmentRefs'?: { 'CardFieldsFragment': CardFieldsFragment } }
) & { ' $fragmentName'?: 'BlockFields_CardBlock_Fragment' };

type BlockFields_GridContainerBlock_Fragment = (
  { __typename?: 'GridContainerBlock', id: string, parentBlockId?: string | null, parentOrder?: number | null }
  & { ' $fragmentRefs'?: { 'GridContainerFieldsFragment': GridContainerFieldsFragment } }
) & { ' $fragmentName'?: 'BlockFields_GridContainerBlock_Fragment' };

type BlockFields_GridItemBlock_Fragment = (
  { __typename?: 'GridItemBlock', id: string, parentBlockId?: string | null, parentOrder?: number | null }
  & { ' $fragmentRefs'?: { 'GridItemFieldsFragment': GridItemFieldsFragment } }
) & { ' $fragmentName'?: 'BlockFields_GridItemBlock_Fragment' };

type BlockFields_IconBlock_Fragment = (
  { __typename?: 'IconBlock', id: string, parentBlockId?: string | null, parentOrder?: number | null }
  & { ' $fragmentRefs'?: { 'IconFieldsFragment': IconFieldsFragment } }
) & { ' $fragmentName'?: 'BlockFields_IconBlock_Fragment' };

type BlockFields_ImageBlock_Fragment = (
  { __typename?: 'ImageBlock', id: string, parentBlockId?: string | null, parentOrder?: number | null }
  & { ' $fragmentRefs'?: { 'ImageFieldsFragment': ImageFieldsFragment } }
) & { ' $fragmentName'?: 'BlockFields_ImageBlock_Fragment' };

type BlockFields_RadioOptionBlock_Fragment = (
  { __typename?: 'RadioOptionBlock', id: string, parentBlockId?: string | null, parentOrder?: number | null }
  & { ' $fragmentRefs'?: { 'RadioOptionFieldsFragment': RadioOptionFieldsFragment } }
) & { ' $fragmentName'?: 'BlockFields_RadioOptionBlock_Fragment' };

type BlockFields_RadioQuestionBlock_Fragment = (
  { __typename?: 'RadioQuestionBlock', id: string, parentBlockId?: string | null, parentOrder?: number | null }
  & { ' $fragmentRefs'?: { 'RadioQuestionFieldsFragment': RadioQuestionFieldsFragment } }
) & { ' $fragmentName'?: 'BlockFields_RadioQuestionBlock_Fragment' };

type BlockFields_SignUpBlock_Fragment = (
  { __typename?: 'SignUpBlock', id: string, parentBlockId?: string | null, parentOrder?: number | null }
  & { ' $fragmentRefs'?: { 'SignUpFieldsFragment': SignUpFieldsFragment } }
) & { ' $fragmentName'?: 'BlockFields_SignUpBlock_Fragment' };

type BlockFields_StepBlock_Fragment = (
  { __typename?: 'StepBlock', id: string, parentBlockId?: string | null, parentOrder?: number | null }
  & { ' $fragmentRefs'?: { 'StepFieldsFragment': StepFieldsFragment } }
) & { ' $fragmentName'?: 'BlockFields_StepBlock_Fragment' };

type BlockFields_TextResponseBlock_Fragment = (
  { __typename?: 'TextResponseBlock', id: string, parentBlockId?: string | null, parentOrder?: number | null }
  & { ' $fragmentRefs'?: { 'TextResponseFieldsFragment': TextResponseFieldsFragment } }
) & { ' $fragmentName'?: 'BlockFields_TextResponseBlock_Fragment' };

type BlockFields_TypographyBlock_Fragment = (
  { __typename?: 'TypographyBlock', id: string, parentBlockId?: string | null, parentOrder?: number | null }
  & { ' $fragmentRefs'?: { 'TypographyFieldsFragment': TypographyFieldsFragment } }
) & { ' $fragmentName'?: 'BlockFields_TypographyBlock_Fragment' };

type BlockFields_VideoBlock_Fragment = (
  { __typename?: 'VideoBlock', id: string, parentBlockId?: string | null, parentOrder?: number | null }
  & { ' $fragmentRefs'?: { 'VideoFieldsFragment': VideoFieldsFragment } }
) & { ' $fragmentName'?: 'BlockFields_VideoBlock_Fragment' };

type BlockFields_VideoTriggerBlock_Fragment = (
  { __typename?: 'VideoTriggerBlock', id: string, parentBlockId?: string | null, parentOrder?: number | null }
  & { ' $fragmentRefs'?: { 'VideoTriggerFieldsFragment': VideoTriggerFieldsFragment } }
) & { ' $fragmentName'?: 'BlockFields_VideoTriggerBlock_Fragment' };

export type BlockFieldsFragment = BlockFields_ButtonBlock_Fragment | BlockFields_CardBlock_Fragment | BlockFields_GridContainerBlock_Fragment | BlockFields_GridItemBlock_Fragment | BlockFields_IconBlock_Fragment | BlockFields_ImageBlock_Fragment | BlockFields_RadioOptionBlock_Fragment | BlockFields_RadioQuestionBlock_Fragment | BlockFields_SignUpBlock_Fragment | BlockFields_StepBlock_Fragment | BlockFields_TextResponseBlock_Fragment | BlockFields_TypographyBlock_Fragment | BlockFields_VideoBlock_Fragment | BlockFields_VideoTriggerBlock_Fragment;

export const ActionFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"parentBlockId"}},{"kind":"Field","name":{"kind":"Name","value":"gtmEventName"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NavigateToBlockAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blockId"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NavigateToJourneyAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"journey"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"language"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bcp47"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LinkAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<ActionFieldsFragment, unknown>;
export const ButtonFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ButtonFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ButtonBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"parentBlockId"}},{"kind":"Field","name":{"kind":"Name","value":"parentOrder"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","alias":{"kind":"Name","value":"buttonVariant"},"name":{"kind":"Name","value":"variant"}},{"kind":"Field","alias":{"kind":"Name","value":"buttonColor"},"name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"startIconId"}},{"kind":"Field","name":{"kind":"Name","value":"endIconId"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionFields"}}]}}]}},...ActionFieldsFragmentDoc.definitions]} as unknown as DocumentNode<ButtonFieldsFragment, unknown>;
export const CardFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CardFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CardBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"parentBlockId"}},{"kind":"Field","name":{"kind":"Name","value":"parentOrder"}},{"kind":"Field","name":{"kind":"Name","value":"backgroundColor"}},{"kind":"Field","name":{"kind":"Name","value":"coverBlockId"}},{"kind":"Field","name":{"kind":"Name","value":"themeMode"}},{"kind":"Field","name":{"kind":"Name","value":"themeName"}},{"kind":"Field","name":{"kind":"Name","value":"fullscreen"}}]}}]} as unknown as DocumentNode<CardFieldsFragment, unknown>;
export const GridContainerFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GridContainerFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GridContainerBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"parentBlockId"}},{"kind":"Field","name":{"kind":"Name","value":"parentOrder"}},{"kind":"Field","name":{"kind":"Name","value":"spacing"}},{"kind":"Field","name":{"kind":"Name","value":"direction"}},{"kind":"Field","name":{"kind":"Name","value":"justifyContent"}},{"kind":"Field","name":{"kind":"Name","value":"alignItems"}}]}}]} as unknown as DocumentNode<GridContainerFieldsFragment, unknown>;
export const GridItemFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GridItemFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GridItemBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"parentBlockId"}},{"kind":"Field","name":{"kind":"Name","value":"parentOrder"}},{"kind":"Field","name":{"kind":"Name","value":"xl"}},{"kind":"Field","name":{"kind":"Name","value":"lg"}},{"kind":"Field","name":{"kind":"Name","value":"sm"}}]}}]} as unknown as DocumentNode<GridItemFieldsFragment, unknown>;
export const IconFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"IconFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IconBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"parentBlockId"}},{"kind":"Field","name":{"kind":"Name","value":"parentOrder"}},{"kind":"Field","alias":{"kind":"Name","value":"iconName"},"name":{"kind":"Name","value":"name"}},{"kind":"Field","alias":{"kind":"Name","value":"iconSize"},"name":{"kind":"Name","value":"size"}},{"kind":"Field","alias":{"kind":"Name","value":"iconColor"},"name":{"kind":"Name","value":"color"}}]}}]} as unknown as DocumentNode<IconFieldsFragment, unknown>;
export const ImageFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ImageFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ImageBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"parentBlockId"}},{"kind":"Field","name":{"kind":"Name","value":"parentOrder"}},{"kind":"Field","name":{"kind":"Name","value":"src"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"blurhash"}}]}}]} as unknown as DocumentNode<ImageFieldsFragment, unknown>;
export const RadioOptionFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RadioOptionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RadioOptionBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"parentBlockId"}},{"kind":"Field","name":{"kind":"Name","value":"parentOrder"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionFields"}}]}}]}},...ActionFieldsFragmentDoc.definitions]} as unknown as DocumentNode<RadioOptionFieldsFragment, unknown>;
export const RadioQuestionFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RadioQuestionFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RadioQuestionBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"parentBlockId"}},{"kind":"Field","name":{"kind":"Name","value":"parentOrder"}}]}}]} as unknown as DocumentNode<RadioQuestionFieldsFragment, unknown>;
export const SignUpFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SignUpFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SignUpBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"parentBlockId"}},{"kind":"Field","name":{"kind":"Name","value":"parentOrder"}},{"kind":"Field","name":{"kind":"Name","value":"submitLabel"}},{"kind":"Field","name":{"kind":"Name","value":"submitIconId"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionFields"}}]}}]}},...ActionFieldsFragmentDoc.definitions]} as unknown as DocumentNode<SignUpFieldsFragment, unknown>;
export const StepFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StepFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StepBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"parentBlockId"}},{"kind":"Field","name":{"kind":"Name","value":"parentOrder"}},{"kind":"Field","name":{"kind":"Name","value":"locked"}},{"kind":"Field","name":{"kind":"Name","value":"nextBlockId"}}]}}]} as unknown as DocumentNode<StepFieldsFragment, unknown>;
export const TextResponseFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TextResponseFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TextResponseBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"parentBlockId"}},{"kind":"Field","name":{"kind":"Name","value":"parentOrder"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"hint"}},{"kind":"Field","name":{"kind":"Name","value":"minRows"}},{"kind":"Field","name":{"kind":"Name","value":"submitLabel"}},{"kind":"Field","name":{"kind":"Name","value":"submitIconId"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionFields"}}]}}]}},...ActionFieldsFragmentDoc.definitions]} as unknown as DocumentNode<TextResponseFieldsFragment, unknown>;
export const TypographyFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TypographyFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TypographyBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"parentBlockId"}},{"kind":"Field","name":{"kind":"Name","value":"parentOrder"}},{"kind":"Field","name":{"kind":"Name","value":"align"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"variant"}}]}}]} as unknown as DocumentNode<TypographyFieldsFragment, unknown>;
export const VideoFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VideoBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"parentBlockId"}},{"kind":"Field","name":{"kind":"Name","value":"parentOrder"}},{"kind":"Field","name":{"kind":"Name","value":"muted"}},{"kind":"Field","name":{"kind":"Name","value":"autoplay"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"posterBlockId"}},{"kind":"Field","name":{"kind":"Name","value":"fullsize"}},{"kind":"Field","name":{"kind":"Name","value":"videoId"}},{"kind":"Field","name":{"kind":"Name","value":"videoVariantLanguageId"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"primary"},"value":{"kind":"BooleanValue","value":true}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"variant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hls"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionFields"}}]}}]}},...ActionFieldsFragmentDoc.definitions]} as unknown as DocumentNode<VideoFieldsFragment, unknown>;
export const VideoTriggerFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoTriggerFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VideoTriggerBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"parentBlockId"}},{"kind":"Field","name":{"kind":"Name","value":"triggerStart"}},{"kind":"Field","alias":{"kind":"Name","value":"triggerAction"},"name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionFields"}}]}}]}},...ActionFieldsFragmentDoc.definitions]} as unknown as DocumentNode<VideoTriggerFieldsFragment, unknown>;
export const BlockFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BlockFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Block"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"parentBlockId"}},{"kind":"Field","name":{"kind":"Name","value":"parentOrder"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ButtonBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ButtonFields"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CardBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CardFields"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GridContainerBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GridContainerFields"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GridItemBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GridItemFields"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"IconBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"IconFields"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ImageBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ImageFields"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RadioOptionBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RadioOptionFields"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RadioQuestionBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RadioQuestionFields"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SignUpBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SignUpFields"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StepBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StepFields"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TextResponseBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TextResponseFields"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TypographyBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TypographyFields"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VideoBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoFields"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VideoTriggerBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoTriggerFields"}}]}}]}},...ButtonFieldsFragmentDoc.definitions,...CardFieldsFragmentDoc.definitions,...GridContainerFieldsFragmentDoc.definitions,...GridItemFieldsFragmentDoc.definitions,...IconFieldsFragmentDoc.definitions,...ImageFieldsFragmentDoc.definitions,...RadioOptionFieldsFragmentDoc.definitions,...RadioQuestionFieldsFragmentDoc.definitions,...SignUpFieldsFragmentDoc.definitions,...StepFieldsFragmentDoc.definitions,...TextResponseFieldsFragmentDoc.definitions,...TypographyFieldsFragmentDoc.definitions,...VideoFieldsFragmentDoc.definitions,...VideoTriggerFieldsFragmentDoc.definitions]} as unknown as DocumentNode<BlockFieldsFragment, unknown>;
export const JourneyFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"JourneyFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Journey"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"language"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"bcp47"}},{"kind":"Field","name":{"kind":"Name","value":"iso3"}},{"kind":"Field","name":{"kind":"Name","value":"name"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"primary"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"publishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"themeName"}},{"kind":"Field","name":{"kind":"Name","value":"themeMode"}},{"kind":"Field","name":{"kind":"Name","value":"seoTitle"}},{"kind":"Field","name":{"kind":"Name","value":"seoDescription"}},{"kind":"Field","name":{"kind":"Name","value":"template"}},{"kind":"Field","name":{"kind":"Name","value":"blocks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BlockFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"primaryImageBlock"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ImageFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"userJourneys"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]}},...BlockFieldsFragmentDoc.definitions,...ImageFieldsFragmentDoc.definitions]} as unknown as DocumentNode<JourneyFieldsFragment, unknown>;
export const GetJourneyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetJourney"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"journey"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"idType"},"value":{"kind":"EnumValue","value":"slug"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"JourneyFields"}}]}}]}},...JourneyFieldsFragmentDoc.definitions]} as unknown as DocumentNode<GetJourneyQuery, GetJourneyQueryVariables>;
export const GetJourneySlugsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetJourneySlugs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"journeys"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]} as unknown as DocumentNode<GetJourneySlugsQuery, GetJourneySlugsQueryVariables>;
export const GetJourneysDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetJourneys"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"journeys"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"featured"},"value":{"kind":"BooleanValue","value":true}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]} as unknown as DocumentNode<GetJourneysQuery, GetJourneysQueryVariables>;
export const JourneyViewEventCreateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"JourneyViewEventCreate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"JourneyViewEventCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"journeyViewEventCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<JourneyViewEventCreateMutation, JourneyViewEventCreateMutationVariables>;
export const ButtonClickEventCreateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ButtonClickEventCreate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ButtonClickEventCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"buttonClickEventCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ButtonClickEventCreateMutation, ButtonClickEventCreateMutationVariables>;
export const ChatOpenEventCreateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChatOpenEventCreate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChatOpenEventCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chatOpenEventCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ChatOpenEventCreateMutation, ChatOpenEventCreateMutationVariables>;
export const RadioQuestionSubmissionEventCreateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RadioQuestionSubmissionEventCreate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RadioQuestionSubmissionEventCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"radioQuestionSubmissionEventCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RadioQuestionSubmissionEventCreateMutation, RadioQuestionSubmissionEventCreateMutationVariables>;
export const SignUpSubmissionEventCreateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignUpSubmissionEventCreate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignUpSubmissionEventCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signUpSubmissionEventCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<SignUpSubmissionEventCreateMutation, SignUpSubmissionEventCreateMutationVariables>;
export const StepViewEventCreateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"StepViewEventCreate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StepViewEventCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stepViewEventCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<StepViewEventCreateMutation, StepViewEventCreateMutationVariables>;
export const TextResponseSubmissionEventCreateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"TextResponseSubmissionEventCreate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TextResponseSubmissionEventCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"textResponseSubmissionEventCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<TextResponseSubmissionEventCreateMutation, TextResponseSubmissionEventCreateMutationVariables>;
export const VideoStartEventCreateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VideoStartEventCreate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VideoStartEventCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"videoStartEventCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<VideoStartEventCreateMutation, VideoStartEventCreateMutationVariables>;
export const VideoPlayEventCreateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VideoPlayEventCreate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VideoPlayEventCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"videoPlayEventCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<VideoPlayEventCreateMutation, VideoPlayEventCreateMutationVariables>;
export const VideoPauseEventCreateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VideoPauseEventCreate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VideoPauseEventCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"videoPauseEventCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<VideoPauseEventCreateMutation, VideoPauseEventCreateMutationVariables>;
export const VideoCompleteEventCreateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VideoCompleteEventCreate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VideoCompleteEventCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"videoCompleteEventCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<VideoCompleteEventCreateMutation, VideoCompleteEventCreateMutationVariables>;
export const VideoExpandEventCreateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VideoExpandEventCreate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VideoExpandEventCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"videoExpandEventCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<VideoExpandEventCreateMutation, VideoExpandEventCreateMutationVariables>;
export const VideoCollapseEventCreateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VideoCollapseEventCreate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VideoCollapseEventCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"videoCollapseEventCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<VideoCollapseEventCreateMutation, VideoCollapseEventCreateMutationVariables>;
export const VideoProgressEventCreateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VideoProgressEventCreate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VideoProgressEventCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"videoProgressEventCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<VideoProgressEventCreateMutation, VideoProgressEventCreateMutationVariables>;