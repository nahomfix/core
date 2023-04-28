-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "primaryLanguageId" TEXT NOT NULL,
    "image" TEXT,
    "slug" TEXT NOT NULL,
    "titleContentId" UUID NOT NULL,
    "snippetContentId" UUID,
    "descriptionContentId" UUID,
    "imageAltContentId" UUID,
    "variantCount" INTEGER NOT NULL,
    "childrenCount" INTEGER NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Children" (
    "parentId" TEXT NOT NULL,
    "childId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "StudyQuestion" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "contentId" UUID NOT NULL,
    "videoId" TEXT NOT NULL,

    CONSTRAINT "StudyQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Variant" (
    "id" TEXT NOT NULL,
    "hls" TEXT,
    "languageId" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,

    CONSTRAINT "Variant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subtitle" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "variantId" TEXT NOT NULL,
    "languageId" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Subtitle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Download" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "variantId" TEXT NOT NULL,
    "quality" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Download_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Content" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "text" TEXT NOT NULL,
    "languageId" TEXT NOT NULL,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Translation" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "contentId" UUID NOT NULL,
    "languageId" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Translation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Video_slug_key" ON "Video"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Children_parentId_childId_key" ON "Children"("parentId", "childId");

-- CreateIndex
CREATE UNIQUE INDEX "StudyQuestion_contentId_videoId_key" ON "StudyQuestion"("contentId", "videoId");

-- CreateIndex
CREATE UNIQUE INDEX "Variant_slug_key" ON "Variant"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Subtitle_variantId_languageId_key" ON "Subtitle"("variantId", "languageId");

-- CreateIndex
CREATE UNIQUE INDEX "Download_variantId_quality_key" ON "Download"("variantId", "quality");

-- CreateIndex
CREATE UNIQUE INDEX "Content_text_languageId_key" ON "Content"("text", "languageId");

-- CreateIndex
CREATE UNIQUE INDEX "Translation_contentId_languageId_key" ON "Translation"("contentId", "languageId");

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_titleContentId_fkey" FOREIGN KEY ("titleContentId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_snippetContentId_fkey" FOREIGN KEY ("snippetContentId") REFERENCES "Content"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_descriptionContentId_fkey" FOREIGN KEY ("descriptionContentId") REFERENCES "Content"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_imageAltContentId_fkey" FOREIGN KEY ("imageAltContentId") REFERENCES "Content"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Children" ADD CONSTRAINT "Children_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Children" ADD CONSTRAINT "Children_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyQuestion" ADD CONSTRAINT "StudyQuestion_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyQuestion" ADD CONSTRAINT "StudyQuestion_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subtitle" ADD CONSTRAINT "Subtitle_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "Variant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Download" ADD CONSTRAINT "Download_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "Variant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Translation" ADD CONSTRAINT "Translation_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
