
var APP_VERSDION = "1.0.24";


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

const LOCAL_STORAGE_KEY = "GAGT_LOCAL_STORAGE_KEY";

const PACKAGE_LIST = [
    {id:1, name:"Nomarl", type:GunPackage.NORMAL, ext:"n"},
    {id:2, name:"Overheat", type:GunPackage.OVERHEAT, ext:"o"},
    {id:3, name:"W Shout", type:GunPackage.WSHOUT, ext:"w"},
    {id:4, name:"ULTRA BOMMY", type:GunPackage.ULTRABOMMY, ext:"u"},
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
    timerId: -1,
};

var NgList = {
    characters: [],
    naguns: [],
};

var PlayerDatas = {
    p1: {
        life: 30,
        burn: 0
    },
    p2: {
        life: 30,
        burn: 0
    },
    displayType: 1,
};

/**
 * 
 */
function initialize(firstPage)
{
    createSetting();
    $("#info-version").text("version: " + APP_VERSDION);
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
        case 'page-life-counter': terminateLifeCounter(); break;
    }

    switch (id)
    {
        case 'page-pickup': initializePickup(); break;
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
function initializePickup()
{
    let html = "";
    for (let i = 0; i < 4; i++)
    {
        html += `<div class="pickup-charatcer pickup-list-item">-----</div>`
        if (i % 2 == 1) html += "<br />";
    }
    $('#pickup-charatcer-list').html(html);

    html = "";
    for (let i = 0; i < 2; i++)
    {
        html += `<div class="pickup-nagun pickup-list-item">-----</div>`
    }
    $('#pickup-light').html(html);
    $('#pickup-heavy').html(html);
    $('#pickup-special').html(html);
}

function initializeLifeCounter()
{
    $('#box-info').hide();
    $('main').css({width:'100vw', margin:'0'});
    $('html').css('overflow-y', 'hidden');
    forbidScroll();

    readStorage();
    updateViewPlayerStatus();
    updateViewScoreDisplayType();
}

function terminateLifeCounter()
{
    closeModal('modal-close');
    $('#box-info').show();
    $('#page-life-counter').hide();
    $('main').css({width:'95vw', marginTop:'1%', marginRight:'-50%'});
    $('html').css('overflow-y', '');
    allowScroll();
}

/**
 * 
 */
function updatePickup()
{
    let html = "";
    html += '<div class="pickup-charatcer pickup-list-item">-----</div>';
    html += '<div class="pickup-charatcer pickup-list-item">-----</div><br />';
    html += '<div class="pickup-charatcer pickup-list-item">-----</div>';
    html += '<div class="pickup-charatcer pickup-list-item">-----</div><br />';
    $('#pickup-charatcer-list').html(html);

    html = "";
    html += '<div class="pickup-nagun pickup-list-item">-----</div>';
    html += '<div class="pickup-nagun pickup-list-item">-----</div>';
    $('#pickup-light').html();
    $('#pickup-heavy').html(html);
    $('#pickup-special').html(html);

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
    let package;
    html = "";
    for (let i = 0; i < 4; i++)
    {
        name = '-----';
        if (i < characterList.length)
        {
            package = getPackageFromType(characterList[i].package);
            name = `${characterList[i].name} (${package.ext})`;
        }
        html += `<div class="pickup-charatcer pickup-list-item fadein">${name}</div>`

        if (i % 2 == 1) html += "<br />";
    }
    $('#pickup-charatcer-list').html(html);

    html = "";
    for (let i = 0; i < 2; i++)
    {
        name = '-----';
        if (i < nagunLightList.length)
        {
            package = getPackageFromType(nagunLightList[i].package);
            name = `${nagunLightList[i].name} (${package.ext})`;
        }
        html += `<div class="pickup-nagun pickup-list-item fadein">${name}</div>`
    }
    $('#pickup-light').html(html);
    
    html = "";
    for (let i = 0; i < 2; i++)
    {
        name = '-----';
        if (i < nagunHeavyList.length)
        {
            package = getPackageFromType(nagunHeavyList[i].package);
            name = `${nagunHeavyList[i].name} (${package.ext})`;
        }
        html += `<div class="pickup-nagun pickup-list-item fadein">${name}</div>`
    }
    $('#pickup-heavy').html(html);
    
    html = "";
    for (let i = 0; i < 2; i++)
    {
        name = '-----';
        if (i < nagunSpecialList.length)
        {
            package = getPackageFromType(nagunSpecialList[i].package);
            name = `${nagunSpecialList[i].name} (${package.ext})`;
        }
        html += `<div class="pickup-nagun pickup-list-item fadein">${name}</div>`
    }
    $('#pickup-special').html(html);

    // 
    let list = $('.pickup-list-item');
    for (let i = 0; i < list.length; i++)
    {
        $(list[i]).delay((i + 1) * 250).queue(function(){
            $(this).dequeue();
            $(this).addClass('active');
        });
    }
};

function addPlayerScore(player, addValue)
{
    if (player in PlayerDatas)
    {
        PlayerDatas[player].life += addValue;
        if (99 < PlayerDatas[player].life) PlayerDatas[player].life = 99;
        if (PlayerDatas[player].life < 0) PlayerDatas[player].life = 0;
        if (addValue > 0)
        {
            $(`#${player}-life-up`).stop(false, true);
            $(`#${player}-life-up`).animate({opacity:1}, 100).animate({opacity:0}, 300);
        }
        else
        {
            $(`#${player}-life-down`).stop(false, true);
            $(`#${player}-life-down`).animate({opacity:1}, 100).animate({opacity:0}, 300);
        }
        updateViewPlayerStatus();
        autoSave();
    }
}

function addPlayerBurn(player, addValue)
{
    if (player in PlayerDatas)
    {
        PlayerDatas[player].burn += addValue;
        if (99 < PlayerDatas[player].burn) PlayerDatas[player].burn = 99;
        if (PlayerDatas[player].burn < 0) PlayerDatas[player].burn = 0;
        if (addValue > 0)
        {
            $(`#${player}-burn-up`).stop(false, true);
            $(`#${player}-burn-up`).animate({opacity:1}, 100).animate({opacity:0}, 300);
        }
        else
        {
            $(`#${player}-burn-down`).stop(false, true);
            $(`#${player}-burn-down`).animate({opacity:1}, 100).animate({opacity:0}, 300);
        }
        updateViewPlayerStatus();
        autoSave();
    }
}

function updateViewPlayerStatus()
{
    $('#p1-life a').text(PlayerDatas.p1.life);
    $('#p2-life a').text(PlayerDatas.p2.life);
    $('#p1-burn a').text(PlayerDatas.p1.burn);
    $('#p2-burn a').text(PlayerDatas.p2.burn);
}

function rotateScoreView()
{   
    switch (PlayerDatas.displayType)
    {
        case 1: PlayerDatas.displayType = 2; break;
        case 2: PlayerDatas.displayType = 3; break;
        case 3: PlayerDatas.displayType = 1; break;
    }

    autoSave();
    updateViewScoreDisplayType();
}

function updateViewScoreDisplayType()
{
    let elm = $('#page-life-counter-innner');
    elm.removeClass('display-type01');
    elm.removeClass('display-type02');
    elm.removeClass('display-type03');

    switch (PlayerDatas.displayType)
    {
        case 1: elm.addClass('display-type01'); break;
        case 2: elm.addClass('display-type02'); break;
        case 3: elm.addClass('display-type03'); break;
    }
}

/**
 * 
 */
function resetLifeCounter()
{
    PlayerDatas.p1.life = 30;
    PlayerDatas.p2.life = 30;
    PlayerDatas.p1.burn = 0;
    PlayerDatas.p2.burn = 0;
    updateViewPlayerStatus();
    closeModal('modal-reset');
    autoSave();
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

function getPackageFromType(packageType)
{
    let package = PACKAGE_LIST[0];
    for (let i = 0; i < PACKAGE_LIST.length; i++)
    {
        if (PACKAGE_LIST[i].type == packageType)
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

function autoSave()
{
    clearTimeout(Page.timerId);
    Page.timerId = setTimeout(function(){
        clearTimeout(Page.timerId);
        writeStorage();
        $('#icon-save').stop(false, true);
        $('#icon-save').animate({opacity:1}, 500).animate({opacity:0}, 800);
    }, 2000);
}


function writeStorage()
{
    var data = {
        'p1Life': PlayerDatas.p1.life,
        'p2Life': PlayerDatas.p2.life,
        'p1Burn': PlayerDatas.p1.burn,
        'p2Burn': PlayerDatas.p2.burn,
        'displayType': PlayerDatas.displayType,
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
}

function readStorage()
{
    var json = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (json == null || json == "") return;
    
    var data = JSON.parse(json);
    PlayerDatas.p1.life = data['p1Life'];
    PlayerDatas.p2.life = data['p2Life'];
    PlayerDatas.p1.burn = data['p1Burn'];
    PlayerDatas.p2.burn = data['p2Burn'];
    PlayerDatas.displayType = data['displayType'];
}


/**
 * 
 */
let isUpdateCheck = false;
function updatePwaApp()
{
    if (isUpdateCheck)
    {
        return;
    }
    isUpdateCheck = true;

    if (!('serviceWorker' in navigator))
    {
        return;
    }

    if (!navigator.onLine)
    {
        alert('オフラインです');
        return;
    }

    $('#btn-update-pwa-app').hide();

    navigator.serviceWorker.getRegistration().then(registration => {
        if (registration.waiting != null)
        {
            registration.unregister();
            alert('更新がみつかりました\nアプリを再起動してください');
        }
        else
        {
            registration.update().then(registration => {
                if (registration.installing != null)
                {
                    registration.installing.onstatechange = e => {
                        if (e.target.state == 'installed')
                        {
                            registration.unregister();
                            alert('更新がみつかりました\nアプリを再起動してください');
                        }
                    }
                }
                else
                {
                    $('#btn-update-pwa-app').show();
                    alert('更新は見つかりませんでした');
                    isUpdateCheck = false;
                }
            });
        }
    });
}
