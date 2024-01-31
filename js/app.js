
class GunPackage {
    static NORMAL = 'NORMAL';
    static OVERHEAT = 'OVERHEAT';
    static WSHOUT = 'WSHOUT';
    static ULTRABOMMY = 'ULTRABOMMY';
};

class GunType {
    static LIGHT = 'LIGHT';
    static HEAVY = 'HEAVY';
    static SPECIAL = 'SPECIAL';
};

const PACKAGE_LIST = [
    {id:1, name:"Nomarl", type:GunPackage.NORMAL, ext:""},
    {id:2, name:"Overheat", type:GunPackage.OVERHEAT, ext:".oh"},
    {id:3, name:"W Shout", type:GunPackage.WSHOUT, ext:".ws"},
    {id:4, name:"ULTRA BOMMY", type:GunPackage.ULTRABOMMY, ext:".ub"},
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
    {id:11, name:"ウノ", package:GunPackage.ULTRABOMMY},
    {id:12, name:"ロック", package:GunPackage.ULTRABOMMY},
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
    {id:16, name:"ミツメ", package:GunPackage.ULTRABOMMY, type:GunType.LIGHT},
    {id:17, name:"カシャ", package:GunPackage.ULTRABOMMY, type:GunType.HEAVY},
    {id:18, name:"ヒダル", package:GunPackage.ULTRABOMMY, type:GunType.SPECIAL},
];

var Page = {
    scrollY: 0,
    isScroll: true,
    current: "",
};

var NgList = {
    characters: [],
    naguns: [],
};

var LifeData = {
    p1: {
        life: 20,
        burn: 0,
    },
    p2: {
        life: 20,
        burn: 0,
    }
};

/**
 * 
 */
function initialize(firstPage)
{
    createSetting();
    viewPage(firstPage);
};



/**
 * 
 */
function viewPage(id)
{
    $('.page-common').hide();
    $(`#${id}`).show();

    switch (Page.current)
    {
        case 'page-setting': saveSetting(); break;
    }

    switch (id)
    {
        case 'page-lottery': initializeLottery(); break;
        case 'page-life-counter': initializeLifeCounter(); break;
    }
    
    Page.current = id;
    $(window).scrollTop(0);
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



    let nagunLightList = [];
    let nagunHeavyList = [];
    let nagunSpecialList = [];
    for (let i = 0; i < NAGUN_LIST.length; i++)
    {
        switch (NAGUN_LIST[i].type)
        {
            case GunType.LIGHT: nagunLightList.push(NAGUN_LIST[i]); break;
            case GunType.HEAVY: nagunHeavyList.push(NAGUN_LIST[i]); break;
            case GunType.SPECIAL: nagunSpecialList.push(NAGUN_LIST[i]); break;
        }
    }
    
    html = "";
    for (let i = 0; i < nagunLightList.length; i++)
    {
        item = nagunLightList[i];
        html += `<div class="select-list-item"><input id="checkbox-nagun-${item.id}" class="input-checkbox select-package-checkbox" type="checkbox" checked>`;
        html += `<label id="character-${item.id}" class="package-${item.package}" for="checkbox-nagun-${item.id}">${item.name}</label></div>`;
        if (i % 2 == 1) html += "<br />";
    }
    $('#setting-nagun-light').html(html);
    
    html = "";
    for (let i = 0; i < nagunHeavyList.length; i++)
    {
        item = nagunHeavyList[i];
        html += `<div class="select-list-item"><input id="checkbox-nagun-${item.id}" class="input-checkbox select-package-checkbox" type="checkbox" checked>`;
        html += `<label id="character-${item.id}" class="package-${item.package}" for="checkbox-nagun-${item.id}">${item.name}</label></div>`;
        if (i % 2 == 1) html += "<br />";
    }
    $('#setting-nagun-heavy').html(html);
    
    html = "";
    for (let i = 0; i < nagunSpecialList.length; i++)
    {
        item = nagunSpecialList[i];
        html += `<div class="select-list-item"><input id="checkbox-nagun-${item.id}" class="input-checkbox select-package-checkbox" type="checkbox" checked>`;
        html += `<label id="character-${item.id}" class="package-${item.package}" for="checkbox-nagun-${item.id}">${item.name}</label></div>`;
        if (i % 2 == 1) html += "<br />";
    }
    $('#setting-nagun-special').html(html);

    //
    for (let i = 0; i < PACKAGE_LIST.length; i++)
    {
        item = PACKAGE_LIST[i];
        $(`#checkbox-package-${item.id}`).change(function(){
            selectPackage($(this));
        });
    }
};

/**
 * 
 */
function selectPackage(elm)
{
    let id = elm[0].id.replace('checkbox-package-', '');
    let package = getPackage(id);
    let checked = elm.prop('checked')

    for (let i = 0; i < CHARACTER_LIST.length; i++)
    {
        if (CHARACTER_LIST[i].package == package.type)
        {
            $(`#checkbox-character-${CHARACTER_LIST[i].id}`).prop('checked', checked);
        }
    }
    for (let i = 0; i < NAGUN_LIST.length; i++)
    {
        if (NAGUN_LIST[i].package == package.type)
        {
            $(`#checkbox-nagun-${NAGUN_LIST[i].id}`).prop('checked', checked);
        }
    }
};

/**
 * 
 */
function saveSetting()
{
    NgList.characters = [];
    NgList.naguns = [];

    for (let i = 0; i < CHARACTER_LIST.length; i++)
    {
        if ($(`#checkbox-character-${CHARACTER_LIST[i].id}`).prop('checked') == false)
        {
            NgList.characters.push(CHARACTER_LIST[i].id);
        }
    }
    for (let i = 0; i < NAGUN_LIST.length; i++)
    {
        if ($(`#checkbox-nagun-${NAGUN_LIST[i].id}`).prop('checked') == false)
        {
            NgList.naguns.push(NAGUN_LIST[i].id);
        }
    }
}

/**
 * 
 */
function initializeLottery()
{
    let html = "";
    for (let i = 0; i < 4; i++)
    {
        html += `<div class="lottery-charatcer lottery-list-item">-----</div>`
        if (i % 2 == 1) html += "<br />";
    }
    $('#lottery-charatcer-list').html(html);

    html = "";
    for (let i = 0; i < 2; i++)
    {
        html += `<div class="lottery-nagun lottery-list-item">-----</div>`
    }
    $('#lottery-light').html(html);
    $('#lottery-heavy').html(html);
    $('#lottery-special').html(html);
}

function initializeLifeCounter()
{
    $('#box-info').hide();
    $('main').css({width:'100vw'})
}

/**
 * 
 */
function updateLottery()
{
    let html = "";
    html += '<div class="lottery-charatcer lottery-list-item">-----</div>';
    html += '<div class="lottery-charatcer lottery-list-item">-----</div><br />';
    html += '<div class="lottery-charatcer lottery-list-item">-----</div>';
    html += '<div class="lottery-charatcer lottery-list-item">-----</div><br />';
    $('#lottery-charatcer-list').html(html);

    html = "";
    html += '<div class="lottery-nagun lottery-list-item">-----</div>';
    html += '<div class="lottery-nagun lottery-list-item">-----</div>';
    $('#lottery-light').html();
    $('#lottery-heavy').html(html);
    $('#lottery-special').html(html);

    let characterList = [];
    let nagunLightList = [];
    let nagunHeavyList = [];
    let nagunSpecialList = [];

    for (let i = 0; i < CHARACTER_LIST.length; i++)
    {
        if (NgList.characters.includes(CHARACTER_LIST[i].id) == false)
        {
            characterList.push(CHARACTER_LIST[i]);
        }
    }
    for (let i = 0; i < NAGUN_LIST.length; i++)
    {
        if (NgList.naguns.includes(NAGUN_LIST[i].id) == false)
        {
            switch (NAGUN_LIST[i].type)
            {
                case GunType.LIGHT: nagunLightList.push(NAGUN_LIST[i]); break;
                case GunType.HEAVY: nagunHeavyList.push(NAGUN_LIST[i]); break;
                case GunType.SPECIAL: nagunSpecialList.push(NAGUN_LIST[i]); break;
            }
        }
    }

    characterList = shuffleArray(characterList);
    nagunLightList = shuffleArray(nagunLightList);
    nagunHeavyList = shuffleArray(nagunHeavyList);
    nagunSpecialList = shuffleArray(nagunSpecialList);

    let name;
    html = "";
    for (let i = 0; i < 4; i++)
    {
        name = '-----';
        if (i < characterList.length)
        {
            name = characterList[i].name;
        }
        html += `<div class="lottery-charatcer lottery-list-item fadein">${name}</div>`

        if (i % 2 == 1) html += "<br />";
    }
    $('#lottery-charatcer-list').html(html);

    html = "";
    for (let i = 0; i < 2; i++)
    {
        name = '-----';
        if (i < nagunLightList.length)
        {
            name = nagunLightList[i].name;
        }
        html += `<div class="lottery-nagun lottery-list-item fadein">${name}</div>`
    }
    $('#lottery-light').html(html);
    
    html = "";
    for (let i = 0; i < 2; i++)
    {
        name = '-----';
        if (i < nagunHeavyList.length)
        {
            name = nagunHeavyList[i].name;
        }
        html += `<div class="lottery-nagun lottery-list-item fadein">${name}</div>`
    }
    $('#lottery-heavy').html(html);
    
    html = "";
    for (let i = 0; i < 2; i++)
    {
        name = '-----';
        if (i < nagunSpecialList.length)
        {
            name = nagunSpecialList[i].name;
        }
        html += `<div class="lottery-nagun lottery-list-item fadein">${name}</div>`
    }
    $('#lottery-special').html(html);

    // 
    let list = $('.lottery-list-item');
    for (let i = 0; i < list.length; i++)
    {
        $(list[i]).delay((i + 1) * 250).queue(function(){
            $(this).dequeue();
            $(this).addClass('active');
        });
    }
};

/**
 * 
 */
function updateCounter(id, param, value)
{
    LifeData[id][param] += value;
    if (LifeData[id][param] < 0) LifeData[id][param] = 0;
    if (99 < LifeData[id][param]) LifeData[id][param] = 99;
    $(`#${id}-${param}-value`).text(LifeData[id][param]);
};

/**
 * 
 */
function resetLifeCounter()
{
    LifeData.p1.life = 20;
    LifeData.p1.burn = 0;
    LifeData.p2.life = 20;
    LifeData.p2.burn = 0;

    $('#p1-life-value').text(LifeData.p1.life);
    $('#p1-burn-value').text(LifeData.p1.burn);
    $('#p2-life-value').text(LifeData.p2.life);
    $('#p2-burn-value').text(LifeData.p2.burn);

    closeModal('modal-reset');
}

/**
 * 
 */
function getPackage(id)
{
    let package = PACKAGE_LIST[0];
    for (let i = 0; i < PACKAGE_LIST.length; i++)
    {
        if (PACKAGE_LIST[i].id == id)
        {
            package = PACKAGE_LIST[i];
            break;
        }
    }
    return package;
}

/**
 * 
 */
function shuffleArray(array)
{
    let k;
    for (let i = array.length; 1 < i; i--)
    {
        k = Math.floor(Math.random() * i);
        [array[k], array[i - 1]] = [array[i - 1], array[k]];
    }
    return array;
};

/**
 * 
 */
function openModal(id)
{
    $(`#${id}`).show();
    $('html').css('overflow-y', 'hidden');
    forbidScroll();
};

/**
 * 
 */
function closeModal(id)
{
    $(`#${id}`).hide();
    $('html').css('overflow-y', '');
    allowScroll();
};

/**
 * 
 */
function allowScroll()
{
    Page.isScroll = true;
    $('html').removeClass('no_scroll');
    $('body').removeClass('no_scroll');
    $(window).scrollTop(Page.scrollY);
};

/**
 * 
 */
function forbidScroll()
{
    Page.isScroll = false;
    Page.scrollY = $(window).scrollTop();
    $('html').addClass('no_scroll');
    $('body').addClass('no_scroll');
};
