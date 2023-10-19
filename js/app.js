
class GunPackage {
    static NORMAL = 'NORMAL';
    static OVERHEAT = 'OVERHEAT';
    static WSHOUT = 'WSHOUT';
};

class GunType {
    static LIGHT = 'LIGHT';
    static HEAVY = 'HEAVY';
    static SPECIAL = 'SPECIAL';
};

const PACKAGE_LIST = [
    {id:1, name:"Nomarl", package:GunPackage.NORMAL},
    {id:2, name:"Overheat", package:GunPackage.OVERHEAT},
    {id:3, name:"W Shout", package:GunPackage.WSHOUT},
];

const CHARACTER_LIST = [
    {id:1, name:"ヒバナ", package:GunPackage.NORMAL},
    {id:2, name:"ナトリ", package:GunPackage.NORMAL},
    {id:3, name:"ラン", package:GunPackage.NORMAL},
    {id:4, name:"キルコ", package:GunPackage.NORMAL},
    {id:5, name:"アマタ", package:GunPackage.OVERHEAT},
    {id:6, name:"マカ", package:GunPackage.OVERHEAT},
    {id:7, name:"ナナネ", package:GunPackage.WSHOUT},
    {id:8, name:"テトラ", package:GunPackage.WSHOUT},
    {id:9, name:"エコ", package:GunPackage.WSHOUT},
    {id:10, name:"アハト", package:GunPackage.WSHOUT},
];

const NAGUN_LIST = [
    {id:1, name:"エンラ", package:GunPackage.NORMAL, type:GunType.LIGHT},
    {id:2, name:"ヌエ", package:GunPackage.NORMAL, type:GunType.HEAVY},
    {id:3, name:"ダタラ", package:GunPackage.NORMAL, type:GunType.SPECIAL},
    {id:4, name:"カサネ", package:GunPackage.NORMAL, type:GunType.LIGHT},
    {id:5, name:"ハクメン", package:GunPackage.NORMAL, type:GunType.HEAVY},
    {id:6, name:"ウワン", package:GunPackage.NORMAL, type:GunType.SPECIAL},
    {id:7, name:"ドドメ", package:GunPackage.OVERHEAT, type:GunType.LIGHT},
    {id:8, name:"キヨヒメ", package:GunPackage.OVERHEAT, type:GunType.HEAVY},
    {id:9, name:"ツエツキ", package:GunPackage.OVERHEAT, type:GunType.SPECIAL},
    {id:10, name:"ヒカギリ", package:GunPackage.WSHOUT, type:GunType.LIGHT},
    {id:11, name:"ロクロ", package:GunPackage.WSHOUT, type:GunType.LIGHT},
    {id:12, name:"ダイダラ", package:GunPackage.WSHOUT, type:GunType.HEAVY},
    {id:13, name:"モウリョウ", package:GunPackage.WSHOUT, type:GunType.HEAVY},
    {id:14, name:"バク", package:GunPackage.WSHOUT, type:GunType.SPECIAL},
    {id:15, name:"コダマ", package:GunPackage.WSHOUT, type:GunType.SPECIAL},
];

var NgList = {
    characters: [],
    naguns: [],
};

var CounterData = {
    player1: 0,
    player2: 0,
    playerBurn1: 0,
    playerBurn2: 0,
};

/**
 * 
 */
function initialize()
{
    createSetting();
};

/**
 * 
 */
function viewPage(id)
{
    $('.page-common').hide();
    $(`#${id}`).show();
};

/**
 * 
 */
function createSetting()
{
    let html = "";
    let item;
    for (let i = 0; i < PACKAGE_LIST.length; i++)
    {
        item = PACKAGE_LIST[i];
        html += `<input id="checkbox-package-${item.id}" class="input-checkbox select-package-checkbox" type="checkbox" checked>`;
        html += `<label id="package-${item.id}" for="checkbox-package-${item.id}">${item.name}</label><br >`;
    }
    $('#package-select').html(html);
    
    html = "";
    for (let i = 0; i < CHARACTER_LIST.length; i++)
    {
        item = CHARACTER_LIST[i];
        html += `<div class="select-list-item"><input id="checkbox-character-${item.id}" class="input-checkbox select-package-checkbox" type="checkbox" checked>`;
        html += `<label id="character-${item.id}" class="package-${item.package}" for="checkbox-character-${item.id}">${item.name}</label></div>`;
        if (i % 2 == 1) html += "<br />";
    }
    $('#character-select').html(html);
    
    html = "";
    for (let i = 0; i < NAGUN_LIST.length; i++)
    {
        item = NAGUN_LIST[i];
        html += `<div class="select-list-item"><input id="checkbox-nagun-${item.id}" class="input-checkbox select-package-checkbox" type="checkbox" checked>`;
        html += `<label id="character-${item.id}" class="package-${item.package}" for="checkbox-nagun-${item.id}">${item.name}</label></div>`;
        if (i % 2 == 1) html += "<br />";
    }
    $('#nagun-select').html(html);
};

/**
 * 
 */
function selectPackage(id)
{
};

/**
 * 
 */
function selectCharacter(id)
{
};

/**
 * 
 */
function selectNagun(id)
{
};

/**
 * 
 */
function updateChoice()
{
};

/**
 * 
 */
function updateCounter(id, value)
{
};



/*
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
*/
