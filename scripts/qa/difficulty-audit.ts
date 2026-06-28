import { loadAllQuestions } from './load-questions';

async function main() {
  const qs = await loadAllQuestions();

  const banks = [
    { label: 'CA DMV',            filter: (q: typeof qs[0]) => q.state === 'CA' && q.testType === 'dmv' },
    { label: 'CA Motorcycle',     filter: (q: typeof qs[0]) => q.state === 'CA' && q.testType === 'motorcycle' },
    { label: 'CDL Federal GK',    filter: (q: typeof qs[0]) => q.testType === 'cdl' && q.category !== 'cdl_school_bus' && q.category !== 'cdl_tank_vehicles' },
    { label: 'CDL School Bus',    filter: (q: typeof qs[0]) => q.category === 'cdl_school_bus' },
    { label: 'CDL Tank Vehicle',  filter: (q: typeof qs[0]) => q.category === 'cdl_tank_vehicles' },
  ];

  for (const bank of banks) {
    const arr = qs.filter(bank.filter);
    const total = arr.length;
    const d = [0,0,0,0];
    for (const q of arr) d[q.difficulty-1]++;
    
    const targetE = Math.round(total * 0.35);
    const targetM = Math.round(total * 0.45);
    const targetH = Math.round(total * 0.20);
    
    console.log(`\n═══ ${bank.label} (${total} questions)`);
    console.log(`  Current: E=${d[0]} (${Math.round(d[0]/total*100)}%)  M=${d[1]} (${Math.round(d[1]/total*100)}%)  H=${d[2]} (${Math.round(d[2]/total*100)}%)`);
    console.log(`  Target:  E=${targetE} (35%)  M=${targetM} (45%)  H=${targetH} (20%)`);
    console.log(`  Delta:   E=${d[0]-targetE>0?'+':''}${d[0]-targetE}  M=${d[1]-targetM>0?'+':''}${d[1]-targetM}  H=${d[2]-targetH>0?'+':''}${d[2]-targetH}`);
  }

  console.log(`\n═══ GRAND TOTAL: ${qs.length} questions`);
}

main().catch(console.error);
