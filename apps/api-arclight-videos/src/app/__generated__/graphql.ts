
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum CacheControlScope {
    PUBLIC = "PUBLIC",
    PRIVATE = "PRIVATE"
}

export enum ArclightVariantDownloadQuality {
    low = "low",
    high = "high"
}

export enum IdType {
    databaseId = "databaseId",
    slug = "slug"
}

export enum ArclightVideoLabel {
    collection = "collection",
    episode = "episode",
    featureFilm = "featureFilm",
    segment = "segment",
    series = "series",
    shortFilm = "shortFilm"
}

export class ArclightVideosFilter {
    availableVariantLanguageIds?: Nullable<string[]>;
    title?: Nullable<string>;
    labels?: Nullable<ArclightVideoLabel[]>;
    ids?: Nullable<string[]>;
    subtitleLanguageIds?: Nullable<string[]>;
}

export class ArclightVariantDownload {
    __typename?: 'ArclightVariantDownload';
    quality: ArclightVariantDownloadQuality;
    size: number;
    url: string;
}

export class ArclightVariant {
    __typename?: 'ArclightVariant';
    id: string;
    hls?: Nullable<string>;
    downloads: ArclightVariantDownload[];
    duration: number;
    language: Language;
    subtitle: Translation[];
    slug: string;
}

export class ArclightVideo {
    __typename?: 'ArclightVideo';
    variant?: Nullable<ArclightVariant>;
    id: string;
    label: ArclightVideoLabel;
    primaryLanguageId: string;
    title: Translation[];
    snippet: Translation[];
    description: Translation[];
    studyQuestions: Translation[];
    image?: Nullable<string>;
    imageAlt: Translation[];
    variantLanguages: Language[];
    variantLanguagesCount: number;
    slug: string;
    children: ArclightVideo[];
    childrenCount: number;
    variantLanguagesWithSlug: LanguageWithSlug[];
}

export class LanguageWithSlug {
    __typename?: 'LanguageWithSlug';
    language?: Nullable<Language>;
    slug?: Nullable<string>;
}

export abstract class IQuery {
    __typename?: 'IQuery';

    abstract arclightVideos(where?: Nullable<ArclightVideosFilter>, offset?: Nullable<number>, limit?: Nullable<number>): ArclightVideo[] | Promise<ArclightVideo[]>;

    abstract arclightVideo(id: string, idType?: Nullable<IdType>): Nullable<ArclightVideo> | Promise<Nullable<ArclightVideo>>;
}

export class Translation {
    __typename?: 'Translation';
    value: string;
    language: Language;
    primary: boolean;
}

export class Language {
    id: string;
}

type Nullable<T> = T | null;
