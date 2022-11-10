var CHARACTER_LIST = [
    {name:"normal_001", package:"normal"},
    {name:"normal_002", package:"normal"},
    {name:"normal_003", package:"normal"},
    {name:"overheat_001", package:"overheat"},
    {name:"overheat_002", package:"overheat"},
    {name:"overheat_003", package:"overheat"},
    {name:"wshout_001", package:"wshout"},
    {name:"wshout_002", package:"wshout"},
    {name:"wshout_003", package:"wshout"},
];

var NAGUN_LIST = [
    {name:"normal_001L1", package:"normal", type:"light"},
    {name:"normal_001L2", package:"normal", type:"light"},
    {name:"normal_002H1", package:"normal", type:"heavy"},
    {name:"normal_002H2", package:"normal", type:"heavy"},
    {name:"normal_003S1", package:"normal", type:"special"},
    {name:"normal_003S2", package:"normal", type:"special"},
    {name:"overheat_001L1", package:"overheat", type:"light"},
    {name:"overheat_001L2", package:"overheat", type:"light"},
    {name:"overheat_002H1", package:"overheat", type:"heavy"},
    {name:"overheat_002H2", package:"overheat", type:"heavy"},
    {name:"overheat_003S1", package:"overheat", type:"special"},
    {name:"overheat_003S2", package:"overheat", type:"special"},
    {name:"wshout_001L1", package:"wshout", type:"light"},
    {name:"wshout_001L2", package:"wshout", type:"light"},
    {name:"wshout_002H1", package:"wshout", type:"heavy"},
    {name:"wshout_002H2", package:"wshout", type:"heavy"},
    {name:"wshout_003S1", package:"wshout", type:"special"},
    {name:"wshout_003S2", package:"wshout", type:"special"},
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

