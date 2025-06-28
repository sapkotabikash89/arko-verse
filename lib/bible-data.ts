// Bible data loader utility
export interface Verse {
  verseId: string;
  reference: string;
  text: string;
}

export interface Chapter {
  [verseNumber: string]: Verse;
}

export interface BookData {
  book: string;
  chapters: {
    [chapterNumber: string]: Chapter;
  };
}

// Import all book data
export const bookModules = {
  'genesis': () => import('./data/book/genesis.json'),
  'exodus': () => import('./data/book/exodus.json'),
  'leviticus': () => import('./data/book/leviticus.json'),
  'numbers': () => import('./data/book/numbers.json'),
  'deuteronomy': () => import('./data/book/deuteronomy.json'),
  'joshua': () => import('./data/book/joshua.json'),
  'judges': () => import('./data/book/judges.json'),
  'ruth': () => import('./data/book/ruth.json'),
  '1-samuel': () => import('./data/book/1-samuel.json'),
  '2-samuel': () => import('./data/book/2-samuel.json'),
  '1-kings': () => import('./data/book/1-kings.json'),
  '2-kings': () => import('./data/book/2-kings.json'),
  '1-chronicles': () => import('./data/book/1-chronicles.json'),
  '2-chronicles': () => import('./data/book/2-chronicles.json'),
  'ezra': () => import('./data/book/ezra.json'),
  'nehemiah': () => import('./data/book/nehemiah.json'),
  'esther': () => import('./data/book/esther.json'),
  'job': () => import('./data/book/job.json'),
  'psalms': () => import('./data/book/psalms.json'),
  'proverbs': () => import('./data/book/proverbs.json'),
  'ecclesiastes': () => import('./data/book/ecclesiastes.json'),
  'song-of-solomon': () => import('./data/book/song-of-solomon.json'),
  'isaiah': () => import('./data/book/isaiah.json'),
  'jeremiah': () => import('./data/book/jeremiah.json'),
  'lamentations': () => import('./data/book/lamentations.json'),
  'ezekiel': () => import('./data/book/ezekiel.json'),
  'daniel': () => import('./data/book/daniel.json'),
  'hosea': () => import('./data/book/hosea.json'),
  'joel': () => import('./data/book/joel.json'),
  'amos': () => import('./data/book/amos.json'),
  'obadiah': () => import('./data/book/obadiah.json'),
  'jonah': () => import('./data/book/jonah.json'),
  'micah': () => import('./data/book/micah.json'),
  'nahum': () => import('./data/book/nahum.json'),
  'habakkuk': () => import('./data/book/habakkuk.json'),
  'zephaniah': () => import('./data/book/zephaniah.json'),
  'haggai': () => import('./data/book/haggai.json'),
  'zechariah': () => import('./data/book/zechariah.json'),
  'malachi': () => import('./data/book/malachi.json'),
  'matthew': () => import('./data/book/matthew.json'),
  'mark': () => import('./data/book/mark.json'),
  'luke': () => import('./data/book/luke.json'),
  'john': () => import('./data/book/john.json'),
  'acts': () => import('./data/book/acts.json'),
  'romans': () => import('./data/book/romans.json'),
  '1-corinthians': () => import('./data/book/1-corinthians.json'),
  '2-corinthians': () => import('./data/book/2-corinthians.json'),
  'galatians': () => import('./data/book/galatians.json'),
  'ephesians': () => import('./data/book/ephesians.json'),
  'philippians': () => import('./data/book/philippians.json'),
  'colossians': () => import('./data/book/colossians.json'),
  '1-thessalonians': () => import('./data/book/1-thessalonians.json'),
  '2-thessalonians': () => import('./data/book/2-thessalonians.json'),
  '1-timothy': () => import('./data/book/1-timothy.json'),
  '2-timothy': () => import('./data/book/2-timothy.json'),
  'titus': () => import('./data/book/titus.json'),
  'philemon': () => import('./data/book/philemon.json'),
  'hebrews': () => import('./data/book/hebrews.json'),
  'james': () => import('./data/book/james.json'),
  '1-peter': () => import('./data/book/1-peter.json'),
  '2-peter': () => import('./data/book/2-peter.json'),
  '1-john': () => import('./data/book/1-john.json'),
  '2-john': () => import('./data/book/2-john.json'),
  '3-john': () => import('./data/book/3-john.json'),
  'jude': () => import('./data/book/jude.json'),
  'revelation': () => import('./data/book/revelation.json'),
};

// Cache for loaded book data
const bookCache = new Map<string, BookData>();

export async function loadBookData(bookName: string): Promise<BookData | null> {
  const normalizedBookName = bookName.toLowerCase().replace(/\s+/g, '-');
  
  // Check cache first
  if (bookCache.has(normalizedBookName)) {
    return bookCache.get(normalizedBookName)!;
  }

  // Load from JSON file
  const moduleLoader = bookModules[normalizedBookName as keyof typeof bookModules];
  if (!moduleLoader) {
    console.warn(`Book not found: ${bookName}`);
    return null;
  }

  try {
    const module = await moduleLoader();
    const bookData = module.default as BookData;
    bookCache.set(normalizedBookName, bookData);
    return bookData;
  } catch (error) {
    console.error(`Error loading book data for ${bookName}:`, error);
    return null;
  }
}

export async function getVerseByVerseId(verseId: string): Promise<Verse | null> {
  // Parse verseId to get book, chapter, and verse
  // Handle formats like "psalms-1-1", "1-corinthians-13-4", etc.
  const parts = verseId.split('-');
  if (parts.length < 3) return null;
  
  // Find the last two parts as verse and chapter
  const verse = parts.pop();
  const chapter = parts.pop();
  const book = parts.join('-');
  
  if (!verse || !chapter || !book) return null;
  
  try {
    return await getVerse(book, parseInt(chapter), parseInt(verse));
  } catch (error) {
    console.error(`Error getting verse by ID ${verseId}:`, error);
    return null;
  }
}

export async function getVerse(bookName: string, chapter: number, verse: number): Promise<Verse | null> {
  try {
    const bookData = await loadBookData(bookName);
    if (!bookData) {
      console.error(`Book data not found for: ${bookName}`);
      return null;
    }

    const chapterData = bookData.chapters[chapter.toString()];
    if (!chapterData) {
      console.error(`Chapter ${chapter} not found in book: ${bookName}`);
      return null;
    }

    const verseData = chapterData[verse.toString()];
    if (!verseData) {
      console.error(`Verse ${verse} not found in ${bookName} chapter ${chapter}`);
      return null;
    }

    return verseData;
  } catch (error) {
    console.error(`Error getting verse ${bookName} ${chapter}:${verse}:`, error);
    return null;
  }
}

export async function getChapter(bookName: string, chapter: number): Promise<Verse[]> {
  const bookData = await loadBookData(bookName);
  if (!bookData) return [];

  const chapterData = bookData.chapters[chapter.toString()];
  if (!chapterData) return [];

  return Object.values(chapterData);
}

export async function getRandomVerse(): Promise<Verse | null> {
  const bookNames = Object.keys(bookModules);
  const randomBook = bookNames[Math.floor(Math.random() * bookNames.length)];
  
  const bookData = await loadBookData(randomBook);
  if (!bookData) return null;

  const chapters = Object.keys(bookData.chapters);
  const randomChapter = chapters[Math.floor(Math.random() * chapters.length)];
  
  const chapterData = bookData.chapters[randomChapter];
  const verses = Object.values(chapterData);
  
  if (verses.length === 0) return null;
  
  const randomVerse = verses[Math.floor(Math.random() * verses.length)];
  return randomVerse;
}

export function parseReference(reference: string): { book: string; chapter: number; verse: number } | null {
  // Parse references like "John 3:16", "1 Corinthians 13:4", "Psalms 1:1", etc.
  const match = reference.match(/^(.*?)\s+(\d+):(\d+)$/);
  if (!match) return null;

  return {
    book: match[1].trim(),
    chapter: parseInt(match[2]),
    verse: parseInt(match[3])
  };
}

export function referenceToSlug(reference: string): string {
  // Convert "John 3:16" to "john-3-16", "Psalms 1:1" to "psalms-1-1"
  return reference.toLowerCase().replace(/[:\s]/g, '-');
}

export function slugToReference(slug: string): string {
  // Convert "psalms-1-1" to "Psalms 1:1", "john-3-16" to "John 3:16"
  const parts = slug.split('-');
  if (parts.length < 3) return slug;
  
  const verse = parts.pop();
  const chapter = parts.pop();
  const book = parts.join(' ');
  
  // Capitalize first letter of each word in book name
  const capitalizedBook = book.split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
  
  return `${capitalizedBook} ${chapter}:${verse}`;
}

// Generate all possible chapter references for static generation
export async function getAllChapterReferences(): Promise<string[]> {
  const references: string[] = [];
  
  for (const bookName of Object.keys(bookModules)) {
    try {
      const bookData = await loadBookData(bookName);
      if (!bookData) continue;
      
      for (const chapterNum of Object.keys(bookData.chapters)) {
        references.push(`${bookName}-${chapterNum}`);
      }
    } catch (error) {
      console.error(`Error loading ${bookName}:`, error);
    }
  }
  
  return references;
}

// Generate all possible verse references for static generation
export async function getAllVerseReferences(): Promise<string[]> {
  const references: string[] = [];
  
  for (const bookName of Object.keys(bookModules)) {
    try {
      const bookData = await loadBookData(bookName);
      if (!bookData) continue;
      
      for (const chapterNum of Object.keys(bookData.chapters)) {
        const chapterData = bookData.chapters[chapterNum];
        for (const verseNum of Object.keys(chapterData)) {
          references.push(`${bookName}-${chapterNum}-${verseNum}`);
        }
      }
    } catch (error) {
      console.error(`Error loading ${bookName}:`, error);
    }
  }
  
  return references;
}

// Topic-based verse collections using local data
export const topicVerses: { [key: string]: string[] } = {
  love: [
    "John 3:16", "1 John 4:8", "1 Corinthians 13:4", "John 15:13", "Romans 8:38",
    "1 John 4:19", "John 15:12", "1 John 4:16", "Ephesians 3:17", "1 John 3:16"
  ],
  faith: [
    "Hebrews 11:1", "Romans 10:17", "Matthew 17:20", "Ephesians 2:8", "2 Corinthians 5:7",
    "Romans 1:17", "Galatians 2:20", "James 2:17", "1 Peter 1:7", "Romans 4:16"
  ],
  hope: [
    "Jeremiah 29:11", "Romans 15:13", "1 Peter 1:3", "Romans 8:24", "Hebrews 6:19",
    "Psalm 42:5", "Lamentations 3:22", "Isaiah 40:31", "Romans 5:3", "1 Thessalonians 4:13"
  ],
  peace: [
    "John 14:27", "Philippians 4:7", "Isaiah 26:3", "Romans 5:1", "Colossians 3:15",
    "2 Thessalonians 3:16", "Numbers 6:26", "Psalm 29:11", "Isaiah 9:6", "Matthew 5:9"
  ],
  strength: [
    "Philippians 4:13", "Isaiah 40:31", "2 Corinthians 12:9", "Psalm 46:1", "Nehemiah 8:10",
    "Ephesians 6:10", "1 Corinthians 16:13", "Joshua 1:9", "Deuteronomy 31:6", "Isaiah 41:10"
  ],
  wisdom: [
    "Proverbs 3:5", "James 1:5", "Proverbs 9:10", "Ecclesiastes 7:12", "1 Corinthians 1:25",
    "Proverbs 1:7", "Proverbs 2:6", "Proverbs 4:7", "Proverbs 8:11", "Proverbs 11:2"
  ]
};

export async function getVersesByTopic(topic: string): Promise<Verse[]> {
  const verses: Verse[] = [];
  const references = topicVerses[topic.toLowerCase()] || [];
  
  for (const reference of references) {
    const parsed = parseReference(reference);
    if (parsed) {
      const verse = await getVerse(parsed.book, parsed.chapter, parsed.verse);
      if (verse) {
        verses.push(verse);
      }
    }
  }
  
  return verses;
}