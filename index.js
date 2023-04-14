function getDate() {
    var time = new Date();
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var day = time.getDate();
    var hour = time.getHours();
    var minute = time.getMinutes();
    
    var now = year + "/" + month + "/" + day + " " + hour + "時" + minute + "分";

    $("#dateTime").html(now);
}

getDate();

function initChart(count) {
    chart = document.getElementsByClassName("chart");
    var num = [];
    var time = new Date();
    var hour = time.getHours();

    num[hour] = count.areas[0].stay;


    new Chart(chart, {
        type: 'bar',
        data: {
          labels: ['00:00', '01:00', '02:00', '03:00',  '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'],
          datasets: [
            {
            label: '混雑カウンタ',
            data: [num[0], num[1], num[2], num[3], num[4], num[5], num[6], num[7], num[8], num[9], num[10], num[11], num[12], num[13], num[14], num[15], num[16], num[17], num[18], num[19], num[20], num[21], num[22], num[23], num[24]],
            borderWidth: 1,
            backgroundColor: "#FF6384"
            },
        ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
    });
}

window.scAsyncInit = function () {
    var sc = SC.create({
        appId: "zNTGZK2JloKT6DujTvls",
        version: "v1"
    });

    sc.api({
        format: "json",
        callback: function(data) {
            area_name = data.areas[0].name;
            entry = data.areas[0].entry;
            exit = data.areas[0].exit;
            congestion = data.areas[0].congestion;
            stay = data.areas[0].stay;

            if (congestion == 5) {
                $(".status-img").attr('src', '../Congestition/image/crowd_lv5.svg');
            } else if (congestion == 4) {
                $(".status-img").attr('src', '../Congestition/image/crowd_lv4.svg');
            } else if (congestion == 3) {
                $(".status-img").attr('src', '../Congestition/image/crowd_lv3.svg');
            } else if (congestion == 2) {
                $(".status-img").attr('src', '../Congestition/image/crowd_lv2.svg');
            } else if (congestion == 1) {
                $(".status-img").attr('src', '../Congestition/image/crowd_lv1.svg');
            } else {
                $(".status-img").attr('src', '../Congestition/image/crowd_lv1.svg');
            }

            $(".entry").html("入場人数: " +entry);
            $(".exit").html("退出人数: " +exit);
            $(".stay").html("宿泊人数: " + stay);
            $(".area-name").html(area_name);

            // $(".btn-info").click(function (event) {
            //     event.preventDefault();
            //     var left = $('#main-content').offset().left;
            //     $("#main-content").css({
            //         left: left
            //     }).animate({
            //         "left": "-25%"
            //     }, "slow");

            //     $("#chartBar").css("display", "block");
            // })

            initChart(data);

            // $(".btn-close").click(function () {
            //     $("#chartBar").css("display", "none");
            //     var left = $('#main-content').offset().left;
            //     $("#main-content").css({
            //         left: left
            //     }).animate({
            //         "left": "0%"
            //     }, "slow");

            // })
        }
    })
};

(function (d, s, id) {
    var js, scjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "https://stg-comieru.secureinc.co.jp/js/sdk.js";
    scjs.parentNode.insertBefore(js, scjs);
}(document, 'script', 'sc-jssdk'));