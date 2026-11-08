(function(){
'use strict';
var $=function(s,r){return (r||document).querySelector(s)};
var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var esc=function(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};

/* ---------- FAQ: контент со старого сайта, вычитан ---------- */
var FAQ=[
 ['Криптовалюты','Что такое криптовалюта?','Криптовалюта — это виртуальные деньги, которые, в отличие от фиатных средств, не имеют физического выражения. Единицей такой валюты является «coin», что в переводе с английского означает «монета». Слово складывается из «crypto» — нечто тайное, скрытое — и «currency» — валюта.','chto-takoye-kriptovalyuta-i-kak-ona-rabotayet'],
 ['Криптовалюты','Чем обеспечена криптовалюта?','Стоимость криптовалюты — это соотношение спроса и предложения. Фиатные валюты поддерживает выпустившее их правительство, а цифровые деньги вроде Bitcoin никем не поддерживаются и не привязаны к физическим резервам, поэтому их цена меняется под влиянием разных факторов. Ценность криптовалютам даёт майнинг — процесс проверки транзакций, который требует работы, электричества и вложений.','chem-obespechena-kriptovalyuta-kakiye-faktory-vliyayut-na-tsennost-kriptovalyut'],
 ['Криптовалюты','Какие бывают криптовалюты?','В мире создано более 8000 цифровых монет, что само собой образовало систему их классификации. Каждая криптовалюта разрабатывается с определённой идеей и заточена под конкретные функции. Все монеты можно разделить на несколько групп.','chto-takoye-altkoin-i-steyblkoin'],
 ['Биткоин','Сколько стоит биткоин сегодня?','Курс биткоина меняется каждую секунду. Волатильность — главное и самое опасное свойство биткоина. Актуальный курс и график онлайн — в блоке «Рынок сегодня» выше и в статье о курсе биткоина.','kurs-bitkoina'],
 ['Биткоин','Почему биткоин падает?','Биткоин, как и другие криптовалюты, отличается высокой волатильностью — отсюда резкие скачки и падения. Снижению курса способствуют повышение ставок, ужесточение монетарной политики для борьбы с инфляцией, укрепление доллара и ухудшение прогнозов глобального роста.','chto-budet-s-bitkoinom-pozitivnye-i-negativnye-scenarii-razvitiya-sobytij'],
 ['Биткоин','Как получить биткоин?','С появлением криптовалюты многие задумались, как заработать 1 биткоин. Если раньше добыча была доступна новичкам, то сейчас она усложнилась: для приличной прибыли нужны высокотехнологичная аппаратура и специальные знания.','kak-zarabotat-odin-bitkoin-za-den-ili-za-mesyats-kak-dolgo-maynit-1-btc'],
 ['Эфириум','Чем Эфириум отличается от Биткоина?','Биткоин часто называют блокчейном первого поколения: язык смарт-контрактов в нём крайне упрощён. Эфир — вторая криптовалюта по капитализации, относится ко второму поколению блокчейнов и даёт разработчикам гораздо больше свободы для создания децентрализованных приложений.','bitcoin-ili-ethereum-kuda-luchshe-investirovat-segodnya'],
 ['Эфириум','Когда Ethereum перешёл на Proof-of-Stake?','Переход Ethereum с Proof-of-Work на Proof-of-Stake состоялся в сентябре 2022 года. Плюсы алгоритма: экологичность по сравнению с доказательством работы, более высокая масштабируемость и лучшая экономика протокола.','ethereum-perehod-na-pos'],
 ['Эфириум','Как майнить эфир?','Пользователи направляют вычислительные мощности оборудования на генерацию нового блока в цепочке и поддерживают работоспособность децентрализованной сети. За найденный блок майнер получает вознаграждение в монетах. После перехода Ethereum на Proof-of-Stake майнинг эфира невозможен — сегодня так добывают другие монеты.','kak-nachat-mayning-kriptovalyuty-poshagovaya-instruktsiya'],
 ['Альткоины','Что такое альткоины?','Альткоин — любая криптовалюта, которая появилась после биткоина. Название происходит от английских слов alternative и coin, то есть «альтернативная монета». По данным сервисов, отслеживающих цены, в мире существует более 10 тысяч таких монет.','chto-takoye-altkoiny-prostymi-slovami-samyye-populyarnyye-altkoiny-na-2021-god-gde-kupit-altkoiny'],
 ['Альткоины','Что такое альтсезон?','Альтсезон — отрезок времени, когда котировки альткоинов растут быстрее биткоина. Так как все монеты, кроме первой криптовалюты, называют альткоинами, явление получило соответствующее название.','kak-zarabotat-na-korrekcii-rynka'],
 ['NFT','Что такое NFT?','NFT-токен (невзаимозаменяемый токен) — уникальный цифровой сертификат, который хранится в блокчейне, гарантирует оригинальность предмета и даёт эксклюзивные права на него. Такой токен нельзя незаметно подменить, разделить или заменить, поэтому система подходит для закрепления прав на произведение искусства, недвижимость или предмет в игре.','chto-takoe-nft-tokeny-prostymi-slovami-spisok-nft-token'],
 ['NFT','Как приобрести NFT?','NFT можно купить только за криптовалюту той сети, на которой они построены. Самая популярная сеть — Ethereum, но из-за более низких комиссий всё больше людей переходят на Polygon и Solana.','chto-takoe-nft-segodnya-i-kakim-budet-nft-zavtra'],
 ['NFT','Безопасно ли покупать NFT-объекты?','Рынок искусства давно называют удобной площадкой для отмывания денег, и NFT могут усугубить эту проблему. Регулирование ужесточается, поэтому перед покупкой стоит проверять продавца, историю токена и площадку.','nft-i-problema-otmyvaniya-deneg'],
 ['Трейдинг','Что такое трейдинг криптовалют?','Криптотрейдинг — это спекуляция на движениях цен цифровых валют: обмен одной криптовалюты на другую, покупка и продажа монет, обмен фиатных денег на криптовалюту. Трейдер изучает новости и совершает сделки в надежде продать актив дороже.','trejding-kriptovalyuty-dlya-nachinayushchih-kak-torgovat-kriptovalyutoj-na-birzhe'],
 ['Трейдинг','Как выбрать биржу для торговли?','Убедитесь, что биржа не экономит на безопасности. Низкие комиссии не помогут при взломе и потере средств. Следите за новостями: если появились сведения о крупной атаке или проблемах с транзакциями, лучше быстро вывести средства.','trejding-kriptovalyuty-dlya-nachinayushchih-kak-torgovat-kriptovalyutoj-na-birzhe'],
 ['Трейдинг','С чего начать трейдинг?','Сначала определитесь с целями и стратегией. Основных стратегий две: инвестирование — покупка актива и долгое хранение, и торговля — краткосрочные спекуляции с постоянным анализом новостей и множеством сделок.','trejding-eto-prosto-mozhno-li-stat-kriptovalyutnym-trejderom-s-nulya'],
 ['Майнинг','Что такое майнинг криптовалют?','Слово «mining» дословно означает добычу полезных ископаемых, а теперь — и добычу цифровых активов. Майнер — человек, который добывает монеты, то есть осуществляет майнинг криптовалют.','mayning-kto-takiye-maynery-i-kak-oni-zarabatyvayut'],
 ['Майнинг','Законно ли майнить криптовалюту в России?','Появляются постановления и законопроекты, внедряется налогообложение, на законодательном уровне закреплён статус ЦФА, но многие вопросы ещё остаются открытыми. Следим за изменениями и разбираем каждое в статьях.','zakonen-li-mayning-bitkoina-v-rossii-i-kakimi-budut-nalogi-na-dobychu-kriptovalyuty'],
 ['Майнинг','Как выбрать оборудование для майнинга?','Ключевые показатели видеокарты: надёжность, энергопотребление, охлаждение и производитель. Кроме неё нужны блок питания, материнская плата с несколькими слотами, оперативная память от 4 ГБ и каркас. Можно купить готовые ASIC или арендовать мощность в облачном проекте.','kak-nachat-mayning-kriptovalyuty-poshagovaya-instruktsiya']
];
var CATS=['Криптовалюты','Биткоин','Эфириум','Альткоины','NFT','Трейдинг','Майнинг'];
var curCat=CATS[0];
var plus='<span class="qa-ic" aria-hidden="true"><svg class="ic" width="16" height="16" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg></span>';
if($('#qaList')){
$('#ftabs').innerHTML=CATS.map(function(c,i){return '<button type="button" role="tab" aria-selected="'+(i===0)+'">'+c+'</button>'}).join('');
$('#fselList').innerHTML=CATS.map(function(c,i){return '<button type="button" aria-selected="'+(i===0)+'">'+c+'</button>'}).join('');
var renderFaq=function(){
 $('#qaList').innerHTML=FAQ.filter(function(q){return q[0]===curCat}).map(function(q,i){
  return '<div class="qa"><button class="qa-q" type="button" aria-expanded="false" id="q'+i+'"><span>'+esc(q[1])+'</span>'+plus+'</button><div class="qa-a" role="region" aria-labelledby="q'+i+'"><p>'+esc(q[2])+'</p><a class="lnk" href="https://blockchain24.pro/'+q[3]+'">Читать статью</a></div></div>';
 }).join('');
 $$('#ftabs button,#fselList button').forEach(function(b){b.setAttribute('aria-selected',String(b.textContent===curCat))});
 $('#fselCur').textContent=curCat;
 typo($('#qaList'));
};
$$('#ftabs button,#fselList button').forEach(function(b){b.addEventListener('click',function(){curCat=b.textContent;$('#fselList').hidden=true;$('#fsel').classList.remove('open');$('.fsel-b').setAttribute('aria-expanded','false');renderFaq()})});
$('.fsel-b').addEventListener('click',function(){var l=$('#fselList'),o=l.hidden;l.hidden=!o;$('#fsel').classList.toggle('open',o);this.setAttribute('aria-expanded',String(o))});
$('#qaList').addEventListener('click',function(e){var b=e.target.closest('.qa-q');if(!b)return;var q=b.parentNode,on=!q.classList.contains('open');$$('.qa',$('#qaList')).forEach(function(x){x.classList.remove('open');$('.qa-q',x).setAttribute('aria-expanded','false')});if(on){q.classList.add('open');b.setAttribute('aria-expanded','true')}});
}

/* ---------- Типографика: предлоги и союзы привязываются к следующему слову ---------- */
function typo(root){
 var re=/(^|[\s(«—])(в|во|и|о|об|на|с|со|к|ко|по|не|за|от|до|для|из|у|а|но|без|при|про|что|как|это)\s/gi;
 var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:function(n){var p=n.parentNode&&n.parentNode.nodeName;return /SCRIPT|STYLE|TEXTAREA|OPTION/.test(p)?2:1}});
 var n;while((n=w.nextNode())){var t=n.nodeValue,o=t;for(var i=0;i<2;i++)t=t.replace(re,'$1$2\u00A0');t=t.replace(/(\d)\s(млн|млрд|трлн|\$|₽|%|ETH|BTC|ГБ)/g,'$1\u00A0$2').replace(/(\d) (\d{3})/g,'$1\u00A0$2').replace(/ — /g,'\u00A0— ');if(t!==o)n.nodeValue=t}
}
typo(document.body);
if($('#qaList'))renderFaq();

/* ---------- Котировки: CoinGecko, резерв — Coinpaprika ---------- */
var COINS=[
 {id:'bitcoin',pp:'btc-bitcoin',t:'BTC',n:'Bitcoin',s:'₿',bg:'#F7931A',u:'https://blockchain24.pro/kurs-bitkoina',p:77818.51,c:-0.03,v:10.70e9,m:1.56e12},
 {id:'ethereum',pp:'eth-ethereum',t:'ETH',n:'Ethereum',s:'Ξ',bg:'#5468D4',u:'https://blockchain24.pro/coins',p:2262.90,c:-0.04},
 {id:'tether',pp:'usdt-tether',t:'USDT',n:'Tether',s:'₮',bg:'#168A6B',u:'https://blockchain24.pro/coins',p:1.00,c:0.01},
 {id:'binancecoin',pp:'bnb-binance-coin',t:'BNB',n:'BNB',s:'B',bg:'#B98900',u:'https://blockchain24.pro/coins',p:707.59,c:-0.06},
 {id:'ripple',pp:'xrp-xrp',t:'XRP',n:'XRP',s:'X',bg:'#23292F',u:'https://blockchain24.pro/coins',p:1.25,c:0.05},
 {id:'usd-coin',pp:'usdc-usd-coin',t:'USDC',n:'USD Coin',s:'$',bg:'#2775CA',u:'https://blockchain24.pro/coins',p:1.00,c:0.01},
 {id:'solana',pp:'sol-solana',t:'SOL',n:'Solana',s:'S',bg:'#7A3FE4',u:'https://blockchain24.pro/coins',p:94.32,c:0.05},
 {id:'tron',pp:'trx-tron',t:'TRX',n:'TRON',s:'T',bg:'#C4302B',u:'https://blockchain24.pro/coins',p:0.31,c:0.05}
];
var CGI='https://coin-images.coingecko.com/coins/images/';
var ICONS={bitcoin:'1/large/bitcoin.png',ethereum:'279/large/ethereum.png',tether:'325/large/Tether.png',binancecoin:'825/large/bnb-icon2_2x.png',ripple:'44/large/xrp-symbol-white-128.png','usd-coin':'6319/large/usdc.png',solana:'4128/large/solana.png',tron:'1094/large/tron-logo.png'};
COINS.forEach(function(c){c.img=CGI+ICONS[c.id]});
var TICK=null;
/* обёрнутые копии монет и токенизированные активы в бегущую строку не берём */
var WRAPPED=/^(wbtc|weth|steth|wsteth|wbeth|weeth|cbbtc|reth|meth|lbtc|solvbtc|jitosol|bnsol|figr_heloc|buidl|ousg|usyc)$/i;
var STABLE=/^(usdt|usdc|dai|fdusd|tusd|usde|usds|pyusd|busd|usdd|usd0|rlusd|usdtb|bsc-usd|usd1|susde|usdx|eurc|xaut|paxg)$/i;
var LEADERS={up:[{n:'Solana',s:'S',bg:'#7A3FE4',c:0.05},{n:'XRP',s:'X',bg:'#23292F',c:0.05},{n:'TRON',s:'T',bg:'#C4302B',c:0.05}],down:[{n:'BNB',s:'B',bg:'#B98900',c:-0.06},{n:'Ethereum',s:'Ξ',bg:'#5468D4',c:-0.04},{n:'Bitcoin',s:'₿',bg:'#F7931A',c:-0.03}]};
var CUR='usd',RUB={},SPARK=null,CHARTS={},PER=7;
var nf=function(x,d){return x.toLocaleString('ru-RU',{minimumFractionDigits:d,maximumFractionDigits:d})};
function price(x){var d=x>=0.1?2:x>=0.001?4:6;return nf(x,d)}
function money(x,sym){var a=Math.abs(x),s=sym||'$';if(a>=1e12)return s+nf(x/1e12,2)+' трлн';if(a>=1e9)return s+nf(x/1e9,2)+' млрд';if(a>=1e6)return s+nf(x/1e6,2)+' млн';return s+nf(x,0)}
function pct(c){var a=nf(Math.abs(c),2);return c>0.005?'▲'+a+'%':c<-0.005?'▼'+a+'%':a+'%'}
function cls(c){return Math.abs(c)<0.02?'flat':(c>0?'up':'down')}
var bell='<svg class="ic" width="17" height="17" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15L6 16Z"/><path d="M10 21h4"/></svg>';
function badge(o,w){
 var img=o.img;if(!img)COINS.forEach(function(c){if(c.n===o.n)img=c.img});
 return '<span class="sq'+(img?' coin':'')+'" style="background:'+o.bg+'">'+o.s+(img?'<img src="'+img+'" alt="" loading="lazy" onerror="this.parentNode.classList.remove(\'coin\');this.remove()">':'')+'</span>'}
/* бегущая строка: при обновлении меняются только цифры, анимация не сбрасывается */
function renderTicker(){
 var list=TICK||COINS.filter(function(c){return !STABLE.test(c.t)});
 var box=$('#hdrRates'),track=box.querySelector('.rates-track'),key=list.map(function(c){return c.t}).join();
 if(track&&track.dataset.key===key){
  list.forEach(function(c,i){$$('.rate[data-i="'+i+'"]',track).forEach(function(a){a.querySelector('.rp').textContent=price(c.p)+' $';var s=a.querySelector('.rc');s.className='rc '+(c.c>=0?'up':'down');s.textContent=pct(c.c)})});
  return;
 }
 var one=list.map(function(c,i){return '<a class="rate" data-i="'+i+'" href="'+(c.u||'https://blockchain24.pro/coins')+'">'+badge(c)+c.t+' <span class="rp">'+price(c.p)+' $</span><span class="rc '+(c.c>=0?'up':'down')+'">'+pct(c.c)+'</span></a>'}).join('');
 box.innerHTML='<div class="rates-track" data-key="'+key+'">'+one+one.replace(/<a class="rate"/g,'<a class="rate" aria-hidden="true" tabindex="-1"')+'</div>';
 track=box.querySelector('.rates-track');
 track.style.setProperty('--dur',Math.max(30,track.scrollWidth/2/45)+'s');
}
function curPrice(c){return CUR==='rub'&&RUB[c.id]!=null?RUB[c.id]:c.p}
function render(){
 var sym=CUR==='rub'?'₽':'$';
 /* на внутренних страницах из котировок есть только бегущая строка в шапке */
 if(!$('#coinRows')){renderTicker();return}
 $('#priceHead').textContent='Цена, '+sym;
 $('#coinRows').innerHTML=COINS.map(function(c){
  return '<div class="tr" role="row"><a class="c" role="cell" href="'+c.u+'">'+badge(c)+'<span><b>'+esc(c.n)+'</b><small>'+c.t+'</small></span></a><span class="p" role="cell">'+price(curPrice(c))+'</span><span class="chg '+cls(c.c)+'" role="cell">'+pct(c.c)+'</span><button class="bell" type="button" data-modal="alert" data-coin="'+c.id+'" aria-label="Оповещение о цене '+esc(c.n)+'">'+bell+'</button></div>';
 }).join('');
 renderTicker();
 if($('#appBtc')){$('#appBtc').textContent=nf(Math.round(COINS[0].p),0)+' $';var ac=$('#appChg');ac.textContent=pct(COINS[0].c);ac.className='iph-chg'+(COINS[0].c<0?' neg':'')}
 var b=COINS[0];
 $('#btcPrice').textContent=price(curPrice(b))+'\u00A0'+sym;
 var ch=$('#btcChg');ch.className='chg '+cls(b.c);ch.textContent=pct(b.c).replace(/^([▲▼])/,'$1 ')+' за 24 часа';
 if(b.v)$('#btcVol').textContent=money(b.v);
 if(b.m)$('#btcCap').textContent=money(b.m);
 var lr=function(o){return '<div class="lr">'+badge(o)+'<span class="nm">'+esc(o.n)+'</span><span class="chg '+cls(o.c)+'">'+pct(o.c)+'</span></div>'};
 $('#leadUp').innerHTML=LEADERS.up.map(lr).join('');
 $('#leadDown').innerHTML=LEADERS.down.map(lr).join('');
 $('#alCoin').innerHTML=COINS.map(function(c){return '<option value="'+c.id+'">'+esc(c.n)+' ('+c.t+')</option>'}).join('');
 drawChart();
 fitAll();
}
function digest(){
 if(!$('#digestTxt'))return;
 var b=COINS[0],u=LEADERS.up[0],d=LEADERS.down[0];
 var dir=b.c>0.3?'вырос на '+nf(b.c,2)+'%':b.c<-0.3?'снизился на '+nf(Math.abs(b.c),2)+'%':'почти не изменился';
 $('#digestTxt').textContent='Биткоин за сутки '+dir+', курс '+price(b.p)+' $. В топ-50 больше всех вырос '+u.n+' ('+pct(u.c)+'), сильнее всех упал '+d.n+' ('+pct(d.c)+').';
}
function series(seed,n){var v=50,r=seed,a=[];for(var i=0;i<n;i++){r=(r*9301+49297)%233280;v+=(r/233280-.5)*12-0.25;a.push(v)}return a}
/* график биткоина: рисуется в реальных пикселях контейнера, чтобы линия, точки и подписи не растягивались */
var CH={};
function compact(x){return x>=1000?nf(x/1000,x>=1e5?0:1)+'K':price(x)}
function drawChart(){
 if(!$('#btcChart'))return;
 var raw=CHARTS[PER]||(PER===7&&SPARK);
 if(!raw){var s=series(PER*5+2,48),a=Math.min.apply(null,s),z=Math.max.apply(null,s),bp=COINS[0].p;raw=s.map(function(v){return bp*(.97+.06*(v-a)/((z-a)||1))})}
 /* лёгкое сглаживание и не больше ~140 точек */
 var step=Math.max(1,Math.floor(raw.length/140)),pts=[];
 for(var i=0;i<raw.length;i+=step){var sum=0,k=0;for(var j=Math.max(0,i-step);j<=Math.min(raw.length-1,i+step);j++){sum+=raw[j];k++}pts.push(sum/k)}
 pts[pts.length-1]=raw[raw.length-1];
 var box=$('#btcChart').parentNode,W=box.clientWidth,H=box.clientHeight;if(!W||!H)return;
 var L=0,R=W-58,T=14,B=H-24,n=pts.length;
 var mn=Math.min.apply(null,pts),mx=Math.max.apply(null,pts),pad=(mx-mn)*.12||mn*.01;mn-=pad;mx+=pad;
 var X=function(i){return L+i/(n-1)*(R-L)},Y=function(p){return T+(1-(p-mn)/(mx-mn))*(B-T)};
 var P=pts.map(function(p,i){return [X(i),Y(p)]});
 /* плавная кривая: Catmull-Rom → кубические Безье */
 var d='M'+P[0][0].toFixed(1)+','+P[0][1].toFixed(1);
 for(i=0;i<n-1;i++){var p0=P[i-1]||P[i],p1=P[i],p2=P[i+1],p3=P[i+2]||p2;
  d+='C'+(p1[0]+(p2[0]-p0[0])/6).toFixed(1)+','+(p1[1]+(p2[1]-p0[1])/6).toFixed(1)+' '+(p2[0]-(p3[0]-p1[0])/6).toFixed(1)+','+(p2[1]-(p3[1]-p1[1])/6).toFixed(1)+' '+p2[0].toFixed(1)+','+p2[1].toFixed(1)}
 var g='';
 for(i=0;i<4;i++){var v=mn+(mx-mn)*(i+.5)/4,y=Y(v).toFixed(1);
  g+='<line x1="'+L+'" x2="'+R+'" y1="'+y+'" y2="'+y+'" stroke="#E4E8F2" stroke-dasharray="3 5"/><text x="'+(W-2)+'" y="'+(+y+4)+'" text-anchor="end" class="ax">'+compact(v)+'</text>'}
 var now=Date.now(),span=PER*864e5,dt=function(i){return new Date(now-span+span*i/(n-1))};
 var lbl=function(t){return PER===1?String(t.getHours()).padStart(2,'0')+':00':t.toLocaleDateString('ru-RU',{day:'numeric',month:'short'}).replace('.','')};
 for(i=0;i<4;i++){var ix=Math.round((n-1)*(i+.5)/4);g+='<text x="'+X(ix).toFixed(1)+'" y="'+(H-4)+'" text-anchor="middle" class="ax">'+lbl(dt(ix))+'</text>'}
 var hi=pts.indexOf(Math.max.apply(null,pts)),lo=pts.indexOf(Math.min.apply(null,pts));
 var mark=function(ix,top){var x=P[ix][0],y=P[ix][1],a=x<60?'start':x>R-60?'end':'middle';
  return '<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="3" fill="#fff" stroke="#1845E7" stroke-width="1.5"/><text x="'+x.toFixed(1)+'" y="'+(top?y-9:y+17).toFixed(1)+'" text-anchor="'+a+'" class="mk">'+price(pts[ix])+'</text>'};
 var last=P[n-1];
 $('#btcChart').setAttribute('viewBox','0 0 '+W+' '+H);
 $('#btcChart').innerHTML='<defs><linearGradient id="cgA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3D6BFF" stop-opacity=".28"/><stop offset=".6" stop-color="#3D6BFF" stop-opacity=".07"/><stop offset="1" stop-color="#3D6BFF" stop-opacity="0"/></linearGradient>'
  +'<linearGradient id="cgL" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7AA0FF"/><stop offset=".55" stop-color="#2E5BFF"/><stop offset="1" stop-color="#1845E7"/></linearGradient>'
  +'<filter id="cgG" x="-10%" y="-30%" width="120%" height="160%"><feGaussianBlur stdDeviation="6"/></filter></defs>'
  +g+'<path d="'+d+'L'+R+','+B+'L'+L+','+B+'Z" fill="url(#cgA)"/>'
  +'<path d="'+d+'" fill="none" stroke="#2E5BFF" stroke-width="6" opacity=".22" filter="url(#cgG)" transform="translate(0 6)"/>'
  +'<path d="'+d+'" fill="none" stroke="url(#cgL)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>'
  +mark(hi,true)+mark(lo,false)
  +'<line x1="'+last[0].toFixed(1)+'" x2="'+R+'" y1="'+last[1].toFixed(1)+'" y2="'+last[1].toFixed(1)+'" stroke="#1845E7" stroke-dasharray="2 3" opacity=".5"/>'
  +'<circle class="pulse" cx="'+last[0].toFixed(1)+'" cy="'+last[1].toFixed(1)+'" r="5" fill="#1845E7"/><circle cx="'+last[0].toFixed(1)+'" cy="'+last[1].toFixed(1)+'" r="4.5" fill="#1845E7" stroke="#fff" stroke-width="2"/>'
  +'<g class="hv" style="opacity:0"><line class="hv-l" y1="'+T+'" y2="'+B+'" stroke="#9AA6C8" stroke-dasharray="3 3"/><circle class="hv-d" r="5" fill="#fff" stroke="#1845E7" stroke-width="2.5"/></g>';
 CH={P:P,pts:pts,dt:dt,lbl:lbl,R:R};
}
(function(){
 if(!$('#btcChart'))return;
 var box=$('#btcChart').parentNode,tip=document.createElement('div');tip.className='ch-tip';box.appendChild(tip);
 function move(e){
  if(!CH.P)return;var r=box.getBoundingClientRect(),x=e.clientX-r.left,P=CH.P,i=Math.round(x/CH.R*(P.length-1));
  i=Math.max(0,Math.min(P.length-1,i));var p=P[i],hv=$('#btcChart .hv');if(!hv)return;
  hv.style.opacity=1;$('.hv-l',hv).setAttribute('x1',p[0]);$('.hv-l',hv).setAttribute('x2',p[0]);$('.hv-d',hv).setAttribute('cx',p[0]);$('.hv-d',hv).setAttribute('cy',p[1]);
  var t=CH.dt(i);tip.innerHTML='<b>'+price(CH.pts[i])+' $</b><span>'+t.toLocaleDateString('ru-RU',{day:'numeric',month:'long'})+', '+String(t.getHours()).padStart(2,'0')+':'+String(t.getMinutes()).padStart(2,'0')+'</span>';
  tip.style.opacity=1;tip.style.left=Math.max(4,Math.min(p[0]-tip.offsetWidth/2,r.width-tip.offsetWidth-4))+'px';tip.style.top=Math.max(0,p[1]-tip.offsetHeight-14)+'px';
 }
 box.addEventListener('pointermove',move);
 box.addEventListener('pointerleave',function(){tip.style.opacity=0;var hv=$('#btcChart .hv');if(hv)hv.style.opacity=0});
 var rt;window.addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(drawChart,120)});
})();
function stamp(src){if(!$('#mktStatus'))return;var d=new Date();$('#mktStatus').textContent='Данные '+src+', обновлено в '+String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0')}
function getJSON(url){return fetch(url,{headers:{accept:'application/json'}}).then(function(r){if(!r.ok)throw new Error(r.status);return r.json()})}
var CG='https://api.coingecko.com/api/v3';
function loadCG(){
 return getJSON(CG+'/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=24h').then(function(list){
  var by={};list.forEach(function(x){by[x.id]=x});
  TICK=list.filter(function(x){return !STABLE.test(x.symbol)&&!WRAPPED.test(x.symbol)&&x.current_price!=null}).slice(0,20).map(function(x){
   var own=null;COINS.forEach(function(c){if(c.id===x.id)own=c});
   return {t:x.symbol.toUpperCase(),n:x.name,s:x.symbol.slice(0,1).toUpperCase(),bg:own?own.bg:'#5C627F',img:x.image,p:x.current_price,c:x.price_change_percentage_24h||0,u:own?own.u:'https://blockchain24.pro/coins'}});
  COINS.forEach(function(c){var x=by[c.id];if(!x)return;c.p=x.current_price;if(x.image)c.img=x.image;c.c=x.price_change_percentage_24h||0;c.v=x.total_volume;c.m=x.market_cap;if(c.id==='bitcoin'&&x.sparkline_in_7d)SPARK=x.sparkline_in_7d.price});
  var pool=list.filter(function(x){return !STABLE.test(x.symbol)&&x.price_change_percentage_24h!=null}).sort(function(a,b){return b.price_change_percentage_24h-a.price_change_percentage_24h});
  var conv=function(x){return {n:x.name,s:x.symbol.slice(0,1).toUpperCase(),bg:'#5C627F',c:x.price_change_percentage_24h,img:x.image}};
  LEADERS.up=pool.slice(0,3).map(conv);LEADERS.down=pool.slice(-3).reverse().map(conv);
  stamp('CoinGecko');
 });
}
function loadPaprika(){
 return Promise.all(COINS.map(function(c){return getJSON('https://api.coinpaprika.com/v1/tickers/'+c.pp+'?quotes=USD').then(function(x){var q=x.quotes.USD;c.p=q.price;c.c=q.percent_change_24h;c.v=q.volume_24h;c.m=q.market_cap})})).then(function(){stamp('Coinpaprika')});
}
function loadRub(){
 return getJSON(CG+'/simple/price?ids='+COINS.map(function(c){return c.id}).join(',')+'&vs_currencies=rub').then(function(r){COINS.forEach(function(c){if(r[c.id])RUB[c.id]=r[c.id].rub})});
}
function loadChart(days){
 if(CHARTS[days]||days===7&&SPARK)return Promise.resolve();
 return getJSON(CG+'/coins/bitcoin/market_chart?vs_currency=usd&days='+days).then(function(r){CHARTS[days]=r.prices.map(function(p){return p[1]})});
}
function refresh(){
 loadCG().catch(function(){return loadPaprika()}).then(function(){digest();render()}).catch(function(){
  if($('#mktStatus'))$('#mktStatus').textContent='Показаны данные на 2 ноября, 14:35: сервис котировок недоступен';
 });
}
render();
refresh();
setInterval(refresh,60000);
function setCur(c){CUR=c;$$('[data-cur]').forEach(function(x){x.setAttribute('aria-pressed',String(x.dataset.cur===c))});render()}
$$('[data-cur]').forEach(function(b){b.addEventListener('click',function(){
 var c=b.dataset.cur;
 if(c==='rub'&&!Object.keys(RUB).length){loadRub().then(function(){setCur('rub')}).catch(function(){setCur('usd');$('#mktStatus').textContent='Цены в рублях временно недоступны: нет связи с сервисом котировок'});return}
 setCur(c);
})});
$$('[data-per]').forEach(function(b){b.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();$$('[data-per]').forEach(function(x){x.setAttribute('aria-pressed',String(x===b))});PER=+b.dataset.per;drawChart();loadChart(PER).then(drawChart).catch(function(){})})});

/* ---------- Подгонка: в колонках остаётся столько пунктов, сколько помещается целиком ---------- */
function fit(list){
 var items=Array.prototype.slice.call(list.children);items.forEach(function(i){i.style.display=''});
 if(window.innerWidth<1100)return;
 var box=list.getBoundingClientRect().bottom;
 items.forEach(function(i){if(i.getBoundingClientRect().bottom>box+1)i.style.display='none'});
}
function fitAll(){$$('[data-fit]').forEach(fit)}

/* ---------- Шапка: сама переходит в мобильный вид, если пункты не помещаются ---------- */
var hdr=$('#hdr'),hcard=$('#hdrCard'),lastY=0;
function overflowing(el){
 if(el.scrollWidth>el.clientWidth+1)return true;
 var r=el.getBoundingClientRect(),pr=parseFloat(getComputedStyle(el).paddingRight)||0,kids=Array.prototype.filter.call(el.children,function(k){return k.offsetParent!==null});
 for(var i=0;i<kids.length;i++){var k=kids[i].getBoundingClientRect();if(k.right>r.right-pr+0.5)return true;if(i&&k.left<kids[i-1].getBoundingClientRect().right+4)return true}
 return false}
function fitHeader(){
 hdr.classList.remove('collapsed','wide-search','no-topics','tiny');
 if(window.innerWidth<1280||overflowing(hcard))hdr.classList.add('collapsed');
 if(hdr.classList.contains('collapsed')&&overflowing(hcard))hdr.classList.add('tiny');
 else{hdr.classList.add('wide-search');if(overflowing(hcard))hdr.classList.remove('wide-search')}
 var row=$('#row2');if(row.scrollWidth>row.clientWidth+1||$('.rates').clientWidth<360)hdr.classList.add('no-topics');
 if(!hdr.classList.contains('compact'))document.documentElement.style.setProperty('--hh',hdr.offsetHeight+'px');
}
function layout(){fitHeader();fitAll()}
layout();
window.addEventListener('resize',layout);
window.addEventListener('load',layout);
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(layout);
/* data-hdr-lock: страница сама держит состояние шапки на время программной прокрутки (табы карточки компании) */
window.addEventListener('scroll',function(){var y=window.scrollY,d=y-lastY;if(document.documentElement.hasAttribute('data-hdr-lock')){lastY=y;return}if(Math.abs(d)<8)return;if(y>200&&d>0)hdr.classList.add('compact');else if(d<0||y<=200)hdr.classList.remove('compact');lastY=y},{passive:true});

/* ---------- Срочно ---------- */
try{if(sessionStorage.getItem('b24-urgent')==='hidden')$('#urgent').hidden=true}catch(e){}
$('#urgentClose').addEventListener('click',function(){$('#urgent').hidden=true;try{sessionStorage.setItem('b24-urgent','hidden')}catch(e){}fitHeader()});

/* ---------- Лента: вкладки на десктопе, аккордеон на мобильном ---------- */
var tabs=$$('.seg [role=tab]');
tabs.forEach(function(t){t.addEventListener('click',function(){tabs.forEach(function(x){var on=x===t;x.setAttribute('aria-selected',String(on));var p=document.getElementById(x.getAttribute('aria-controls'));p.hidden=!on;p.classList.toggle('open',on);$('.acc-h',p).setAttribute('aria-expanded',String(on))});fitAll()})});
$$('.feed .acc-h').forEach(function(h){h.addEventListener('click',function(){var p=h.parentNode,on=!p.classList.contains('open');p.classList.toggle('open',on);h.setAttribute('aria-expanded',String(on))})});

/* ---------- Рубрики: аккордеон на мобильном ---------- */
$$('.rub-h').forEach(function(h){h.addEventListener('click',function(){if(window.innerWidth>1099)return;var r=h.parentNode,on=!r.classList.contains('open');r.classList.toggle('open',on);h.setAttribute('aria-expanded',String(on))})});

/* ---------- Выбор редакции: слайдер на мобильном, свайп и мышь ---------- */
var track=$('#picks');
if(track){
var cards=$$('.pick',track),dotsW=$('#dots');
dotsW.innerHTML=cards.map(function(c,i){return '<button class="dot'+(i?'':' on')+'" type="button" aria-label="Материал '+(i+1)+'"></button>'}).join('');
var dots=$$('.dot',dotsW);
function step(){return cards[0].getBoundingClientRect().width+12}
function go(i){i=Math.max(0,Math.min(cards.length-1,i));track.scrollTo({left:cards[i].offsetLeft-cards[0].offsetLeft,behavior:'smooth'})}
function cur(){var i=Math.round(track.scrollLeft/step());if(track.scrollLeft+track.clientWidth>=track.scrollWidth-4)i=cards.length-1;return Math.min(i,cards.length-1)}
var st;track.addEventListener('scroll',function(){clearTimeout(st);st=setTimeout(function(){var i=cur();dots.forEach(function(d,k){d.classList.toggle('on',k===i)})},60)},{passive:true});
dots.forEach(function(d,i){d.addEventListener('click',function(){go(i)})});
$('#prev').addEventListener('click',function(){go(cur()-1)});
$('#next').addEventListener('click',function(){go(cur()+1)});
var drag=null,block=false;
track.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse'||e.button!==0||track.scrollWidth<=track.clientWidth)return;drag={x:e.clientX,s:track.scrollLeft,m:false}});
window.addEventListener('pointermove',function(e){if(!drag)return;var dx=e.clientX-drag.x;if(!drag.m&&Math.abs(dx)>5){drag.m=true;track.classList.add('drag')}if(drag.m)track.scrollLeft=drag.s-dx});
window.addEventListener('pointerup',function(){if(!drag)return;var m=drag.m;drag=null;if(m){track.classList.remove('drag');go(cur());block=true;setTimeout(function(){block=false},60)}});
track.addEventListener('click',function(e){if(block){e.preventDefault();e.stopPropagation()}},true);
track.addEventListener('dragstart',function(e){e.preventDefault()});
}

/* ---------- Окна ---------- */
var last=null;
function openO(id){closeAll(true);var o=document.getElementById(id);last=document.activeElement;o.hidden=false;document.body.classList.add('lock');var f=$('input:not([type=hidden]),select,button',o);if(f)setTimeout(function(){f.focus()},30)}
function closeAll(keep){$$('.ovl').forEach(function(o){o.hidden=true});document.body.classList.remove('lock');if(!keep&&last)last.focus()}
$$('.ovl').forEach(function(o){o.addEventListener('click',function(e){if(e.target===o)closeAll()})});
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeAll()});
document.addEventListener('click',function(e){
 var t=e.target.closest('[data-open],[data-modal],[data-close],[data-close-nav],#menu nav a');if(!t)return;
 if(t.matches('[data-close]')){closeAll();return}
 if(t.matches('[data-close-nav],#menu nav a')){closeAll(true);return}
 if(t.dataset.open){openO(t.dataset.open);return}
 if(t.dataset.modal){e.preventDefault();var f=$('#'+t.dataset.modal+' form');reset(f);if(t.dataset.coin){$('#alCoin').value=t.dataset.coin;var c=COINS.filter(function(x){return x.id===t.dataset.coin})[0];if(c)$('#alPrice').placeholder=price(c.p)}openO(t.dataset.modal)}
});

/* ---------- Формы ---------- */
function reset(f){if(!f)return;f.reset();$('[data-body]',f).hidden=false;$('[data-ok]',f).hidden=true;$('.err',f).hidden=true;$$('.fld',f).forEach(function(l){l.classList.remove('bad')})}
$$('.js-form').forEach(function(f){f.addEventListener('submit',function(e){
 e.preventDefault();var bad=false;
 $$('[required]',f).forEach(function(i){var v=i.value.trim(),ok=v.length>0&&(i.type!=='email'||/^\S+@\S+\.\S+$/.test(v));i.closest('.fld').classList.toggle('bad',!ok);if(!ok)bad=true});
 $('.err',f).hidden=!bad;if(bad)return;
 /* TODO: отправка на сервер — fetch('/api/forms',{method:'POST',body:new FormData(f)}) */
 $('[data-body]',f).hidden=true;$('[data-ok]',f).hidden=false;
})});

/* ---------- События: обратный отсчёт до ближайшего форума и файл для календаря ---------- */
(function(){
 var f=$('.evf');if(!f)return;
 var start=new Date(f.dataset.start),end=new Date(f.dataset.end),cd=$('#evCd'),inn=$('#evIn');
 var plural=function(n,a,b,c){var m=n%10,h=n%100;return m===1&&h!==11?a:m>=2&&m<=4&&(h<12||h>14)?b:c};
 function tick(){
  var ms=start-Date.now();
  if(ms<=0){inn.textContent=Date.now()<end?'идёт сейчас':'завершилось';cd.hidden=true;return}
  var d=Math.floor(ms/864e5),h=Math.floor(ms/36e5)%24,m=Math.floor(ms/6e4)%60,s=Math.floor(ms/1e3)%60;
  $('[data-u=d]',cd).textContent=d;$('[data-u=h]',cd).textContent=String(h).padStart(2,'0');$('[data-u=m]',cd).textContent=String(m).padStart(2,'0');$('[data-u=s]',cd).textContent=String(s).padStart(2,'0');
  $('[data-u=d]',cd).nextElementSibling.textContent=plural(d,'день','дня','дней');
  inn.textContent=d?'через '+d+' '+plural(d,'день','дня','дней'):'уже завтра';
 }
 tick();setInterval(tick,1000);
 var z=function(t){return t.toISOString().replace(/[-:]/g,'').replace(/\.\d+/,'')};
 var ics=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Blockchain24//RU','BEGIN:VEVENT','UID:the-trends-2026@blockchain24.pro','DTSTAMP:'+z(new Date()),'DTSTART:'+z(start),'DTEND:'+z(end),'SUMMARY:The Trends 2026','LOCATION:Москва','URL:https://blockchain24.pro/events','END:VEVENT','END:VCALENDAR'].join('\r\n');
 $('#evIcs').href='data:text/calendar;charset=utf-8,'+encodeURIComponent(ics);
})();

/* ---------- Карточка форума: цифровой фон — потоки цифр ---------- */
(function(){
 var card=$('.evf');if(!card||!window.HTMLCanvasElement)return;
 var cv=document.createElement('canvas');cv.className='evf-art';cv.setAttribute('aria-hidden','true');card.insertBefore(cv,card.firstChild);
 var ctx=cv.getContext('2d'),dpr=Math.min(window.devicePixelRatio||1,2),still=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 var CH='0123456789ABCDEF',FS=14,cols=[],w=0,h=0,run=false,raf=0,last=0;
 function rnd(){return CH[Math.random()*CH.length|0]}
 function size(){
  w=card.clientWidth;h=card.clientHeight;cv.width=Math.round(w*dpr);cv.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
  var n=Math.ceil(w/(FS*1.15));cols=[];
  for(var i=0;i<n;i++)cols.push({y:Math.random()*h,v:.35+Math.random()*.9,len:8+(Math.random()*16|0),ch:[],a:.35+Math.random()*.65});
  cols.forEach(function(c){for(var k=0;k<c.len;k++)c.ch.push(rnd())});
  draw(0);
 }
 function draw(dt){
  ctx.clearRect(0,0,w,h);ctx.font='600 '+FS+'px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace';ctx.textAlign='center';
  for(var i=0;i<cols.length;i++){
   var c=cols[i],x=i*FS*1.15+FS/2;
   if(!still){c.y+=c.v*dt*.06;if(c.y-c.len*FS>h){c.y=-Math.random()*h*.5;c.v=.35+Math.random()*.9}
    if(Math.random()<.04)c.ch[Math.random()*c.len|0]=rnd()}
   for(var k=0;k<c.len;k++){
    var y=c.y-k*FS;if(y<-FS||y>h+FS)continue;
    var t=1-k/c.len;
    ctx.fillStyle=k===0?'rgba(235,242,255,'+(.95*c.a)+')':'rgba('+(110+60*t|0)+','+(140+60*t|0)+',255,'+(t*.55*c.a).toFixed(3)+')';
    ctx.fillText(c.ch[k],x,y);
   }
  }
 }
 function loop(t){var dt=last?Math.min(t-last,50):16;last=t;draw(dt);raf=run?requestAnimationFrame(loop):0}
 function play(on){run=on&&!still;if(run&&!raf){last=0;raf=requestAnimationFrame(loop)}}
 size();
 if(window.ResizeObserver)new ResizeObserver(function(){if(Math.abs(card.clientWidth-w)>1||Math.abs(card.clientHeight-h)>1)size()}).observe(card);
 if(window.IntersectionObserver)new IntersectionObserver(function(e){play(e[0].isIntersecting)}).observe(card);else play(true);
})();

/* ---------- Кнопка «наверх»: появляется после первого экрана, кольцо показывает прогресс ---------- */
(function(){
 var b=$('#toTop');if(!b)return;var pr=$('.pr',b),L=163.4,tk=false;
 b.hidden=false;
 function upd(){tk=false;var y=window.scrollY,m=document.documentElement.scrollHeight-window.innerHeight;
  b.classList.toggle('on',y>window.innerHeight*.8);pr.style.strokeDashoffset=(L*(1-(m>0?Math.min(1,y/m):0))).toFixed(1)}
 window.addEventListener('scroll',function(){if(!tk){tk=true;requestAnimationFrame(upd)}},{passive:true});
 window.addEventListener('resize',upd);upd();
 b.addEventListener('click',function(){var r=window.matchMedia('(prefers-reduced-motion: reduce)').matches;window.scrollTo({top:0,behavior:r?'auto':'smooth'});var f=$('a,button',$('#hdr'));if(f)f.focus({preventScroll:true})});
})();

/* ---------- Видео: по клику обложка меняется на плеер YouTube прямо в блоке ---------- */
$$('[data-yt]').forEach(function(a){a.addEventListener('click',function(e){
 if(e.ctrlKey||e.metaKey||e.shiftKey)return;e.preventDefault();
 var m=$('.media',a),f=document.createElement('iframe');
 f.src='https://www.youtube-nocookie.com/embed/'+a.dataset.yt+'?autoplay=1&rel=0';f.title=a.getAttribute('aria-label')||'Видео';
 f.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';f.allowFullscreen=true;
 m.innerHTML='';m.appendChild(f);a.classList.add('is-playing');a.removeAttribute('href');
},{once:true})});

/* ---------- Голоса индустрии: цитаты экспертов, автосмена с паузой при наведении ---------- */
/* ЗАГЛУШКИ: тексты цитат придуманы для макета, заменить на реальные */
(function(){
 var box=$('#expCol.vq-card');if(!box)return;
 var Q=[
  {n:'Gleb Jount',r:'CEO Bitget CIS',img:'jount',u:'gleb-jount',t:'Биржи больше не соревнуются комиссиями. Выигрывает тот, кому пользователь доверяет свои деньги в момент паники на рынке.'},
  {n:'Аарон Хомский',r:'ICB Fund',img:'khomsky',u:'aaron-khomsky',t:'Институциональные деньги приходят в крипту медленно, но каждый новый фонд остаётся на рынке надолго.'},
  {n:'Алекс Райнхардт',r:'Предприниматель, эксперт в криптотехнологиях',img:'rajnhardt',u:'aleks-rajnhardt',t:'Хороший проект виден не по white paper, а по тому, что команда делает, когда рынок падает.'},
  {n:'Антон Ефименко',r:'Консультант по токеномике',img:'yefimenko',u:'-anton-yefimenko',t:'Токеномика — это не таблица с распределением. Это ответ на вопрос, зачем человеку держать токен через год.'},
  {n:'Айгерим Джаксыбаева',r:'Партнёр WE Legal',img:'dzhaksybayeva',u:'aygerim-dzhaksybayeva',t:'Регулирование не убивает рынок. Оно отсекает тех, кто строил бизнес на отсутствии правил.'},
  {n:'Александр Беленов',r:'Блокчейн-лаборатория «Идея»',img:'belenov',u:'aleksandr-belenov',t:'Блокчейн полезен там, где участникам не нужно доверять друг другу. Во всех остальных случаях хватит обычной базы данных.'}
 ];
 var cur=-1,timer=0,DUR=7000,still=window.matchMedia('(prefers-reduced-motion: reduce)').matches,fig=$('.vq',box),bar=$('.vq-bar i',box),avs=$('#vqAvs');
 box.style.setProperty('--vq',DUR+'ms');
 avs.innerHTML=Q.map(function(q,i){return '<button class="vq-av" type="button" role="tab" aria-selected="false" aria-label="'+esc(q.n)+'" data-i="'+i+'"><img src="./img/experts/'+q.img+'.webp" alt="" loading="lazy"></button>'}).join('');
 function fill(i){var q=Q[i];$('#vqText').textContent='«'+q.t+'»';$('#vqName').textContent=q.n;$('#vqRole').textContent=q.r;$('#vqImg').src='./img/experts/'+q.img+'.webp';$('#vqWho').href='https://blockchain24.pro/experts/'+q.u}
 function show(i){
  if(i===cur)return;cur=i;
  $$('.vq-av',avs).forEach(function(b,k){b.setAttribute('aria-selected',String(k===i))});
  if(still){fill(i);return}
  fig.classList.add('out');setTimeout(function(){fill(i);fig.classList.remove('out')},300);
  bar.classList.remove('run');void bar.offsetWidth;bar.classList.add('run');
 }
 bar.addEventListener('animationend',function(){show((cur+1)%Q.length)});
 avs.addEventListener('click',function(e){var b=e.target.closest('.vq-av');if(b)show(+b.dataset.i)});
 /* высота цитаты — по самой длинной, чтобы карточка не прыгала при смене */
 var fw=0;
 function fit(){
  var w=fig.clientWidth;if(!w||w===fw)return;fw=w;
  var c=fig.cloneNode(true);c.removeAttribute('aria-live');c.classList.remove('out');c.style.cssText='position:absolute;visibility:hidden;left:0;top:0;min-height:0;width:'+w+'px';
  $$('[id]',c).forEach(function(n){n.removeAttribute('id')});box.appendChild(c);
  var t=$('blockquote',c),nm=$('.vq-who b',c),rl=$('.vq-who small',c),m=0;
  Q.forEach(function(q){t.textContent='«'+q.t+'»';nm.textContent=q.n;rl.textContent=q.r;m=Math.max(m,c.offsetHeight)});
  box.removeChild(c);fig.style.minHeight=m+'px';
 }
 if(window.ResizeObserver)new ResizeObserver(fit).observe(box);
 if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){fw=0;fit()});
 fill(0);show(0);fit();
})();
})();
