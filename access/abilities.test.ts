/**
 * npx jest abilities.test.ts
 *
 */

import {
  getChannelingInterrupts,
  getDispellableBuffs,
  getRoots,
  getSilences,
} from "./abilities";

/*
test("abilities-getChannelingInterrupts", () => {
  const interrupsChanneling = getChannelingInterrupts("legion_commander");
  //console.log(`interrupsChanneling: `, interrupsChanneling);
  expect(
    !!interrupsChanneling.find((item) => item.skill === "legion_commander_duel")
  ).toBe(true);
});

test("abilities-getSilences", () => {
  const silences = getSilences("silencer");
  expect(!!silences.find((item) => item.skill === "silencer_last_word")).toBe(
    true
  );
});

test("abilities-getRoots", () => {
  const roots = getRoots("treant");
  console.log(`roots: `, roots);
  expect(!!roots.find((item) => item.skill === "treant_overgrowth")).toBe(true);
});
*/

test("abilities-getDispellableBuffs", () => {
  const buffs = getDispellableBuffs("bloodseeker");
  console.log(`roots: `, buffs);
  expect(buffs.includes("bloodseeker_bloodrage")).toBe(true);
});
