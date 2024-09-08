/** START code "personally wrote without assistance" These are my objects to define* Trees, Collectables, clouds, Mountains and canyons.* **/
getItems = function() {
    trees_x = [-205, 165, 499, 1075, 1850, -500, -1000, 750, 1300, 2200, 2700]
    treePos_y = floorPos_y/2+16;
    collectables = [
        {
            x_pos: 260,
            y_pos: floorPos_y - 110,
            size: 50,
            isFound: false,
        },
        {
            x_pos: 460,
            y_pos: floorPos_y - 195,
            size: 50,
            isFound: false,
        },
        {
            x_pos: 680,
            y_pos: floorPos_y - 290,
            size: 50,
            isFound: false,
        },

        {
            x_pos: 1000,
            y_pos: floorPos_y - 350,
            size: 50,
            isFound: false,
        },
        {
            x_pos: 1100,
            y_pos: floorPos_y - 350,
            size: 50,
            isFound: false,
        },
        {
            x_pos: 1550,
            y_pos: floorPos_y - 100,
            size: 50,
            isFound: false,
        },
        {
            x_pos: 1780,
            y_pos: floorPos_y - 80,
            size: 50,
            isFound: false,
        },
        {
            x_pos: 2400,
            y_pos: floorPos_y - 20,
            size: 50,
            isFound: false,
        },
        {
            x_pos: 2850,
            y_pos: floorPos_y - 30,
            size: 50,
            isFound: false,
        },
        {
            x_pos: 2850,
            y_pos: floorPos_y - 300,
            size: 50,
            isFound: false,
        }

    ];
    clouds = [
        {
            x: 100,
            y: 100,
            size: 50
        },
        {
            x: 500,
            y: 125,
            size: 50
        },
        {
            x: 900,
            y: 90,
            size: 50
        },
        {
            x: 1300,
            y: 115,
            size: 50
        },
        {
            x: 1700,
            y: 105,
            size: 50
        },
        {
            x: 2100,
            y: 130,
            size: 50
        },
        {
            x: 2500,
            y: 95,
            size: 50
        },
        {
            x: 2900,
            y: 120,
            size: 50
        },
        {
            x: -100,
            y: 110,
            size: 50
        },
        {
            x: -500,
            y: 95,
            size: 50
        },
        {
            x: -900,
            y: 125,
            size: 50
        },
        {
            x: -1300,
            y: 100,
            size: 50
        }
    ];
    mountains = [
        {
            x:( (10+310) / 2),
            y:75,
            x2:10,
            y2:floorPos_y,
            x3: 310,
            y3:floorPos_y,

            snowCord1X:((10+310) / 2),
            snowCord1Y:75,
            snowCord2X:(105),
            snowCord2Y:200,
            snowCord3X:(215),
            snowCord3Y:(200)
        },
        {
            x:( (700+1000) / 2),
            y:75,
            x2:700,
            y2:floorPos_y,
            x3: 1000,
            y3:floorPos_y,

            snowCord1X:( (700+1000) / 2),
            snowCord1Y:75,

            snowCord2X:(795),
            snowCord2Y:200,

            snowCord3X:(905),
            snowCord3Y:(200)
        },
        {
            x: ( (700+1000) / 2) + 690,
            y: 75,
            x2: 700 + 690,
            y2: floorPos_y,
            x3: 1000 + 690,
            y3: floorPos_y,

            snowCord1X: ( (700+1000) / 2) + 690,
            snowCord1Y: 75,

            snowCord2X: 795 + 690,
            snowCord2Y: 200,

            snowCord3X: 905 + 690,
            snowCord3Y: 200
        },
        {
            x: ( (700+1000) / 2) + 2*690,
            y: 75,
            x2: 700 + 2*690,
            y2: floorPos_y,
            x3: 1000 + 2*690,
            y3: floorPos_y,

            snowCord1X: ( (700+1000) / 2) + 2*690,
            snowCord1Y: 75,

            snowCord2X: 795 + 2*690,
            snowCord2Y: 200,

            snowCord3X: 905 + 2*690,
            snowCord3Y: 200
        },
        {
            x: ( (700+1000) / 2) + 3*690,
            y: 75,
            x2: 700 + 3*690,
            y2: floorPos_y,
            x3: 1000 + 3*690,
            y3: floorPos_y,

            snowCord1X: ( (700+1000) / 2) + 3*690,
            snowCord1Y: 75,

            snowCord2X: 795 + 3*690,
            snowCord2Y: 200,

            snowCord3X: 905 + 3*690,
            snowCord3Y: 200
        },
        {
            x: ( (700+1000) / 2) - 690,
            y: 75,
            x2: 700 - 690,
            y2: floorPos_y,
            x3: 1000 - 690,
            y3: floorPos_y,

            snowCord1X: ( (700+1000) / 2) - 690,
            snowCord1Y: 75,

            snowCord2X: 795 - 690,
            snowCord2Y: 200,

            snowCord3X: 905 - 690,
            snowCord3Y: 200
        },
        {
            x: ( (700+1000) / 2) - 2*690,
            y: 75,
            x2: 700 - 2*690,
            y2: floorPos_y,
            x3: 1000 - 2*690,
            y3: floorPos_y,

            snowCord1X: ( (700+1000) / 2) - 2*690,
            snowCord1Y: 75,

            snowCord2X: 795 - 2*690,
            snowCord2Y: 200,

            snowCord3X: 905 - 2*690,
            snowCord3Y: 200
        },
        {
            x: ( (700+1000) / 2) - 3*690,
            y: 75,
            x2: 700 - 3*690,
            y2: floorPos_y,
            x3: 1000 - 3*690,
            y3: floorPos_y,

            snowCord1X: ( (700+1000) / 2) - 3*690,
            snowCord1Y: 75,

            snowCord2X: 795 - 3*690,
            snowCord2Y: 200,

            snowCord3X: 905 - 3*690,
            snowCord3Y: 200
        }
    ]
}