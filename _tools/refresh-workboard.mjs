#!/usr/bin/env node
import { refreshWorkboard, readWorkboardPath } from './workboard-lib.mjs';

const wb = refreshWorkboard();
console.log(`Atualizado: ${readWorkboardPath()} (${wb})`);