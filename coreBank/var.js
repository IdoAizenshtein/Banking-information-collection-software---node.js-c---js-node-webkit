if (!all) {
    var all = {};
}
if (!all.banks) {
    all.banks = {};
}
all.banks = {
    core: {},
    accounts: {},
    generalVariables: {
        numChecksDrawn: 0,
        numChecksNotWithdrawn: 0
    },
    config: {
        user: 'spider2',
        pass: 'asdmju876gfd',
        versionNum: '0.0.5'
    },
    spiderConfig: {},
    accountDetails: {},
    vpnConnected: false,
    statusWorkUpdate: false,
    statusWorkFromRest: false,
    openBankPage: false,
    IsNewDateBankHadoar: false,
    bankPoalimAsakimManual: false,
    targets: {
// ----------- banks --------------
        "4": {
            name: "יהב",
            icon: "bank4.png"
        },
        "9": {
            name: "בנק הדואר",
            icon: "bank9.png"
        },
        "10": {
            name: "לאומי",
            icon: "bank10.png"
        },
        "11": {
            name: "דיסקונט",
            icon: "bank11.png"
        },
        "12": {
            name: "הפועלים",
            icon: "bank12.png"
        },
        "13": {
            name: "איגוד",
            icon: "bank13.png"
        },
        "14": {
            name: "אוצר החייל",
            icon: "bank14.png"
        },
        "17": {
            name: "מרכנתיל דיסקונט",
            icon: "bank17.png"
        },
        "20": {
            name: "מזרחי טפחות",
            icon: "bank20.png"
        },
        "31": {
            name: "הבינלאומי הראשון",
            icon: "bank31.png"
        },
        "34": {
            name: "ערבי ישראלי",
            icon: "bank10.png"
        },
        "46": {
            name: "מסד",
            icon: "bank46.png"
        },
        "52": {
            name: "פאג\"י",
            icon: "bank52.png"
        },
        "54": {
            name: "בנק ירושלים",
            icon: "bank54.png"
        },
        "68": {
            name: "דקסיה",
            icon: "bank68.png"
        },
        "122": {
            name: "פועלים לעסקים",
            icon: "bank12.png"
        },
        "126": {
            name: "יובנק",
            icon: "bank126.png"
        },
        "157": {
            name: "מרכנתיל עסקים פלוס",
            icon: "bank17.png"
        },
        "158": {
            name: "דיסקונט עסקים פלוס",
            icon: "bank11.png"
        },
// ----------- cards --------------
        "21": {
            name: "ויזה כ.א.ל",
            icon: "card21.png"
        },
        "22": {
            name: "ישראכרט",
            icon: "card22.png"
        },
        "23": {
            name: "מסטרכארד",
            icon: "card23.png"
        },
        "24": {
            name: "לאומי קארד",
            icon: "card24.png"
        },
        "25": {
            name: "אמריקן אקספרס",
            icon: "card25.png"
        },
        "26": {
            name: "דיינרס",
            icon: "card26.png"
        },
// ----------- slika --------------
        "80": {
            name: "לאומי קארד",
            icon: "solek80.png"
        },
        "81": {
            name: "ויזה כ.א.ל",
            icon: "solek81.png"
        },
        "82": {
            name: "ישראכרט",
            icon: "solek82.png"
        },
        "83": {
            name: "דיינרס",
            icon: "solek83.png"
        },
        "84": {
            name: "אמריקן אקספרס",
            icon: ""
        },
        "85": {
            name: "פועלים אקספרס",
            icon: ""
        },
        "86": {
            name: "יורוקרד",
            icon: ""
        },
        "87": {
            name: "משולם",
            icon: "solek87.png"
        },
        "88": {
            name: "מאסטרקארד",
            icon: "solek88.png"
        },
        "89": {
            name: "צמרת מימונים",
            icon: "solek89.png"
        },
        "90": {
            name: "גמא",
            icon: "solek90.png"
        },
        "91": {
            name: "יציל פיננסים",
            icon: "solek91.png"
        }
    }
};



//if (!tray || tray == null) {
//	var tray = new nw.Tray({
//		icon: 'menuFrame/appBizibox.png',
//		alticon: 'menuFrame/appBizibox.png',
//		iconsAreTemplates: false});
//}
//else {
//	tray.remove();
//	tray = null;
//}
