function calculatePrice(v) {
  const limits={grams:1e6,kg:1e9,hours:1e5,rate:1e9,quantity:1e6,waste:1000,extras:1e9,margin:99};
  for (const [k,max] of Object.entries(limits)) if (!Number.isFinite(v[k]) || v[k]<0 || v[k]>max) throw new Error('Valor inválido');
  if (!Number.isInteger(v.quantity)||v.quantity<1||![1,500,1000,5000].includes(v.round)) throw new Error('Cantidad o redondeo inválido');
  const material=v.grams/1000*v.kg*(1+v.waste/100),machine=v.hours*v.rate,cost=material+machine+v.extras;
  const raw=cost/(1-v.margin/100)/v.quantity;
  const unit=Math.ceil(Math.round(raw/v.round*1e8)/1e8)*v.round,total=unit*v.quantity;
  return {material,machine,cost,unitCost:cost/v.quantity,unit,total,profit:total-cost,effective:total?(total-cost)/total*100:0};
}
export { calculatePrice };
if(typeof document!=='undefined') {
 const form=document.getElementById('calculator-form'),money=n=>'Gs. '+new Intl.NumberFormat('es-PY',{maximumFractionDigits:0}).format(n);
 let summary='';
 function update(){
  try {
   const v={rate:3000,quantity:1,waste:10,extras:0,margin:40,round:1000};
   for(const key of ['kg','grams','hours']) {const input=document.getElementById('calc-'+key);if(!input.checkValidity()||input.value==='')throw new Error('Entrada inválida');v[key]=Number(input.value)}
   const r=calculatePrice(v);
   document.getElementById('calc-total').textContent=money(r.total);
   summary=`Kappeto Lab · Presupuesto estimado\nPrecio de la tanda completa: ${money(r.total)}\nSujeto a confirmación del diseño y plazo.`;
   document.getElementById('calc-output').hidden=false;document.getElementById('calc-error').hidden=true;
  } catch {summary='';document.getElementById('calc-output').hidden=true;document.getElementById('calc-error').hidden=false}
  document.getElementById('calc-copy-status').textContent='';
 }
 form.addEventListener('input',update);form.addEventListener('change',update);form.addEventListener('submit',e=>e.preventDefault());form.addEventListener('reset',()=>setTimeout(update,0));
 document.getElementById('calc-copy').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(summary);document.getElementById('calc-copy-status').textContent='Presupuesto copiado.'}catch{document.getElementById('calc-copy-status').textContent='No se pudo copiar. Podés seleccionar el precio y copiarlo manualmente.'}}); update();
}
