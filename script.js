$(document).ready(function () {
    const datas = [
        {
            "classroom": "Class A",
            "students": [
                {"name": "Alice", "age": 14},
                {"name": "Bob", "age": 15}
            ]
        },
        {
            "classroom": "Class B",
            "students": [
                {"name": "Charlie", "age": 13},
                {"name": "David", "age": 14}
            ]
        }
    ];

    // 预加载 b.html 内容并渲染
    $.get('b.html', function (data) {
        const renderedContent = juicer(data, { data: datas });
        console.log('Rendered Content:', renderedContent); // 调试输出

        // 将渲染后的内容插入到弹窗
        $('#popup').html(renderedContent);
    }).fail(function() {
        console.error("Failed to load b.html");
    });

    // 点击按钮显示弹窗
    $('#showPopup').click(function () {
        $('#popup').removeClass('hidden').addClass('visible');
    });

    // 点击空白处隐藏弹窗
    $(document).click(function (event) {
        if (!$(event.target).closest('#popup, #showPopup').length) {
            $('#popup').removeClass('visible').addClass('hidden');
        }
    });
});
