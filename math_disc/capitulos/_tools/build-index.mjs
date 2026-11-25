#!/usr/bin/env node
import { buildBookIndex } from '../../../_tools/build-book-index.mjs';
buildBookIndex(new URL('../../', import.meta.url));
