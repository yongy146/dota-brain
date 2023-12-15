/**
 * npx jest abilities.test.ts
 *
 */

import { IAbility } from "@gameData/out/dota2Abilities";
import {
  analyzeHeroAbilities,
  getChannelingInterrupts,
  getDispellableBuffs,
  getRoots,
  getSilences,
} from "./abilities";

test("abilities-getChannelingInterrupts(jakiro)", () => {
  const interrupsChanneling = getChannelingInterrupts("jakiro");
  //console.log(`interrupsChanneling: `, interrupsChanneling);
  expect(
    !!interrupsChanneling.find((item) => item.skill === "jakiro_ice_path")
  ).toBe(true);
});

test("abilities-getChannelingInterrupts(legion_commander)", () => {
  const interrupsChanneling = getChannelingInterrupts("legion_commander");
  //console.log(`interrupsChanneling: `, interrupsChanneling);
  expect(
    !!interrupsChanneling.find((item) => item.skill === "legion_commander_duel")
  ).toBe(true);
});

/*test("abilities-getSilences", () => {
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

test("abilities-getDispellableBuffs", () => {
  const buffs = getDispellableBuffs("bloodseeker");
  console.log(`roots: `, buffs);
  expect(buffs.includes("bloodseeker_bloodrage")).toBe(true);
});

test("abilities-analyzeHeroAbilities", () => {
  // vengefulspirit
  // witch_doctor
  const analysis = analyzeHeroAbilities([20, 30]);

  const result: any = {};
  for (const [key, value] of Object.entries<IAbility[]>(analysis as any)) {
    result[key] = value.map((ability) => ability.key);
  }

  //console.log(`analysis2:\n`, JSON.stringify(result, null, 2));
  expect(result).toEqual({
    buffsBasicDispel: ["vengefulspirit_nether_swap"],
    debuffsDisablesBasicDispel: [],
    debuffsDisablesStrongDispel: [
      "vengefulspirit_magic_missile",
      "vengefulspirit_nether_swap",
      "witch_doctor_paralyzing_cask",
    ],
    spellsNonDispellable: [],
    passivesBreakable: ["vengefulspirit_command_aura"],
    passivesNonBreakable: [],
  });
});
*/
