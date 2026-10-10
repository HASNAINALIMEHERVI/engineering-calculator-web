(function(root){
'use strict';
function number(text){ if(String(text).trim()==='') throw Error('Enter every value.'); const n=Number(text); if(!Number.isFinite(n)) throw Error('Use finite numbers only.'); return n; }
function list(text){ return String(text).split(',').map(number); }
function matrix(text){ const a=String(text).trim().split('\n').map(list); const n=a.length; if(n<2||n>8||a.some(r=>r.length!==n)) throw Error('Enter a square matrix with 2 to 8 rows.'); return a; }
function checked(n){if(!Number.isFinite(n)) throw Error('Result exceeds the supported numeric range.');return n;}
function determinant(a){ const m=a.map(r=>r.slice()),n=m.length;let d=1; for(let i=0;i<n;i++){let p=i;for(let j=i+1;j<n;j++)if(Math.abs(m[j][i])>Math.abs(m[p][i]))p=j;if(m[p][i]===0)return 0;if(p!==i){[m[p],m[i]]=[m[i],m[p]];d=-d;}const v=m[i][i];d=checked(d*v);for(let j=i+1;j<n;j++){const f=m[j][i]/v;for(let k=i+1;k<n;k++)m[j][k]=checked(m[j][k]-f*m[i][k]);}}return checked(d);}
function solve(a,b){ const n=a.length;if(b.length!==n)throw Error('Enter one constant per matrix row.');const m=a.map((r,i)=>[...r,b[i]]);for(let i=0;i<n;i++){let p=i;for(let j=i+1;j<n;j++)if(Math.abs(m[j][i])>Math.abs(m[p][i]))p=j;const scale=Math.max(...m[p].slice(0,n).map(Math.abs));if(scale===0||Math.abs(m[p][i])<=1e-12*scale)throw Error('No numerically reliable unique solution. System may be singular or ill-conditioned.');[m[i],m[p]]=[m[p],m[i]];for(let j=i+1;j<n;j++){const f=m[j][i]/m[i][i];for(let k=i;k<=n;k++)m[j][k]=checked(m[j][k]-f*m[i][k]);}}const x=Array(n).fill(0);for(let i=n-1;i>=0;i--){let s=m[i][n];for(let j=i+1;j<n;j++)s=checked(s-m[i][j]*x[j]);x[i]=checked(s/m[i][i]);}return x;}
function positive(n){if(n<=0)throw Error('Resistance must be greater than zero.');return n;}
const operations={
 add:{label:'Addition',fields:['First value','Second value'],run:(a,b)=>checked(number(a)+number(b))},
 divide:{label:'Division',fields:['Numerator','Denominator'],run:(a,b)=>{const d=number(b);if(d===0)throw Error('Cannot divide by zero.');return checked(number(a)/d);}},
 sqrt:{label:'Square root',fields:['Non-negative value'],run:a=>{const n=number(a);if(n<0)throw Error('Real square roots require a non-negative value.');return Math.sqrt(n);}},
 sine:{label:'Sine (radians)',fields:['Angle in radians'],run:a=>Math.sin(number(a))},
 log:{label:'Logarithm',fields:['Positive value','Base (positive, other than 1)'],run:(a,b)=>{const x=number(a),base=number(b);if(x<=0||base<=0||base===1)throw Error('Value and base must be positive; base cannot be 1.');return checked(Math.log(x)/Math.log(base));}},
 factorial:{label:'Factorial',fields:['Integer from 0 to 170'],run:a=>{const n=number(a);if(!Number.isInteger(n)||n<0||n>170)throw Error('Use an integer from 0 to 170.');let v=1;for(let i=2;i<=n;i++)v*=i;return v;}},
 mean:{label:'Mean',fields:['Values, separated by commas'],run:a=>{const v=list(a);return checked(v.reduce((s,n)=>s+n/v.length,0));}},
 variance:{label:'Population variance',fields:['Values, separated by commas'],run:a=>{const v=list(a),avg=operations.mean.run(a);return checked(v.reduce((s,n)=>s+(n-avg)**2/v.length,0));}},
 voltage:{label:'Ohm’s law: voltage',fields:['Current (A)','Resistance (Ω, positive)'],run:(a,b)=>checked(number(a)*positive(number(b)))},
 current:{label:'Ohm’s law: current',fields:['Voltage (V)','Resistance (Ω, positive)'],run:(a,b)=>checked(number(a)/positive(number(b)))},
 divider:{label:'Voltage divider across R2',fields:['Input voltage (V)','R1 (Ω, positive)','R2 (Ω, positive)'],run:(a,b,c)=>{const r1=positive(number(b)),r2=positive(number(c));return checked(number(a)*(r2/checked(r1+r2)));}},
 parallel:{label:'Two parallel resistors',fields:['R1 (Ω, positive)','R2 (Ω, positive)'],run:(a,b)=>{const r1=positive(number(a)),r2=positive(number(b));return checked(1/(1/r1+1/r2));}},
 determinant:{label:'Matrix determinant',fields:['Matrix: comma-separated rows, one row per line'],multiline:true,run:a=>determinant(matrix(a))},
 solve:{label:'Linear system: A x = b',fields:['Matrix A: comma-separated rows, one row per line','Constants b, separated by commas'],multiline:true,run:(a,b)=>solve(matrix(a),list(b))}
};
const api={number,list,matrix,determinant,solve,operations};if(typeof module!=='undefined')module.exports=api;else root.EngineeringMath=api;
})(typeof globalThis!=='undefined'?globalThis:this);
