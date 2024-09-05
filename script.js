$(document).ready(function () {
    // 初始数据
    let datas = [
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

    // 渲染函数
    function render() {
        $.get('b.html', function (template) {
            const renderedContent = juicer(template, { data: datas });
            $('#popup').html(renderedContent);
        }).fail(function() {
            console.error("Failed to load b.html");
        });
    }

    // 初始渲染
    render();

    // 显示弹窗
    $('#showPopup').click(function () {
        $('#popup').removeClass('hidden').addClass('visible');
    });

    // 点击空白处隐藏弹窗
    $(document).click(function (event) {
        if (!$(event.target).closest('#popup, #showPopup').length) {
            $('#popup').removeClass('visible').addClass('hidden');
        }
    });

    // 添加班级
    $(document).on('click', '#addClassroom', function() {
        const newClassroom = {
            "classroom": `Class ${String.fromCharCode(65 + datas.length)}`, // 自动命名为 Class A, B, C, ...
            "students": []
        };
        datas.push(newClassroom);
        render();
    });

    // 添加学生
    $(document).on('click', '.addStudent', function() {
        const classroomIndex = $(this).closest('.classroom').data('index');
        datas[classroomIndex].students.push({"name": "New Student", "age": 16});
        render();
    });

    // 删除学生
    $(document).on('click', '.removeStudent', function() {
        const classroomIndex = $(this).closest('.classroom').data('index');
        const studentIndex = $(this).closest('li').data('sindex');
        datas[classroomIndex].students.splice(studentIndex, 1);
        render();
    });

    // 删除班级
    $(document).on('click', '.removeClassroom', function() {
        const classroomIndex = $(this).closest('.classroom').data('index');
        datas.splice(classroomIndex, 1);
        render();
    });

    // 编辑学生姓名和年龄
    $(document).on('input', '.student-name', function() {
        const classroomIndex = $(this).closest('.classroom').data('index');
        const studentIndex = $(this).closest('li').data('sindex');
        datas[classroomIndex].students[studentIndex].name = $(this).val();
    });

    $(document).on('input', '.student-age', function() {
        const classroomIndex = $(this).closest('.classroom').data('index');
        const studentIndex = $(this).closest('li').data('sindex');
        datas[classroomIndex].students[studentIndex].age = parseInt($(this).val());
    });

    // 打印当前的 JSON 数据
    $(document).on('click', '#printData', function() {
        console.log('Current Data:', JSON.stringify(datas, null, 2));
        console.log('Current Data:', JSON.stringify(datas));
        alert(JSON.stringify(datas, null, 2));
        alert(JSON.stringify(datas));
    });
});
