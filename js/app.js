
const CHARACTER_LIST = [
    {name:"ヒバナ", package:"normal"},
    {name:"ナトリ", package:"normal"},
    {name:"ラン", package:"normal"},
    {name:"キルコ", package:"normal"},
    {name:"アマタ", package:"overheat"},
    {name:"マカ", package:"overheat"},
    {name:"ナナネ", package:"wshout"},
    {name:"テトラ", package:"wshout"},
    {name:"エコ", package:"wshout"},
    {name:"アハト", package:"wshout"},
];

const NAGUN_LIST = [
    {name:"エンラ", package:"normal", type:"light"},
    {name:"ヌエ", package:"normal", type:"heavy"},
    {name:"ダタラ", package:"normal", type:"special"},
    {name:"カサネ", package:"normal", type:"light"},
    {name:"ハクメン", package:"normal", type:"heavy"},
    {name:"ウワン", package:"normal", type:"special"},
    {name:"ドドメ", package:"overheat", type:"light"},
    {name:"キヨヒメ", package:"overheat", type:"heavy"},
    {name:"ツエツキ", package:"overheat", type:"special"},
    {name:"ヒカギリ", package:"wshout", type:"light"},
    {name:"ロクロ", package:"wshout", type:"light"},
    {name:"ダイダラ", package:"wshout", type:"heavy"},
    {name:"モウリョウ", package:"wshout", type:"heavy"},
    {name:"バク", package:"wshout", type:"special"},
    {name:"コダマ", package:"wshout", type:"special"},
];


function selectPackage()
{
    $('#select-package').addClass('display-none');

    // 抽出
    let select_list = $('.select-package-checkbox:checked');
    let select_package = [];
    select_list.each(function(idx, elm){
        select_package.push(elm.name);
    });

    // キャラクターをまとめる
    let character_list = [];
    CHARACTER_LIST.forEach(elm => {
        if (select_package.includes(elm.package))
        {
            character_list.push(elm);
        }
    });

    // 武器をまとめる
    let nagun_list = [];
    NAGUN_LIST.forEach(elm => {
        if (select_package.includes(elm.package))
        {
            nagun_list.push(elm);
        }
    });

    // キャラクター抽選
    character_list = shuffleArray(character_list).slice(0, 4);

    // 武器抽選
    let light_list = [];
    let heavy_list = [];
    let special_list = [];
    nagun_list.forEach(elm => {
        switch (elm.type)
        {
            case 'light': light_list.push(elm); break;
            case 'heavy': heavy_list.push(elm);break;
            case 'special': special_list.push(elm);break;
        }
    });
    light_list = shuffleArray(light_list).slice(0, 2);
    heavy_list = shuffleArray(heavy_list).slice(0, 2);
    special_list = shuffleArray(special_list).slice(0, 2);

    // 書き換え
    $('#result-character').empty();
    character_list.forEach(elm => {
        $('#result-character').append(`<div>${elm.package} : ${elm.name}</div>`);
    });
    $('#result-nagun').empty();
    light_list.forEach(elm => {
        $('#result-nagun').append(`<div>${elm.package} : ${elm.name}</div>`);
    });
    heavy_list.forEach(elm => {
        $('#result-nagun').append(`<div>${elm.package} : ${elm.name}</div>`);
    });
    special_list.forEach(elm => {
        $('#result-nagun').append(`<div>${elm.package} : ${elm.name}</div>`);
    });

    
    $('#result').removeClass('display-none');
    $('body').addClass('height-long');
}

function reset()
{
    $('#select-package').removeClass('display-none');
    $('#result').addClass('display-none');
    $('body').removeClass('height-long');
}

function shuffleArray(ary)
{
    for (let i = ary.length - 1; i > 0; i--)
    {
        let j = Math.floor(Math.random() * (i + 1));
        [ary[i], ary[j]] = [ary[j], ary[i]];
    }
    return ary;
}

