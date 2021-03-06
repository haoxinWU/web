/**
 * Created by leon on 15/10/15.
 */
var index = {
    data : {

        time_count : 0,
        time_cost : 0,
        answered_count : 0,
        question_count : 0,
        right_answer : 0,
        wrong_answer : 0,
        score : 0 ,
        right_ids : '',
        wrong_ids : '',
    },
    init : function(){
        //题目数初始化
        index.data.question_count = parseInt($('#question-count').text());
        index.functions.checkPlayLimit(function (limit,message) {

        }, function (limit,message) {
            $.alert({
                title : "提示",
                content: message,
                confirmButton : "确认",
                confirmButtonClass: 'btn-success',
                confirm : function () {

                }
            });
        });
    },
    event : function () {
        //开始答题按钮
        $('.start-button').on('click', function () {
            var btn = $(this);
            index.functions.checkPlayLimit(function (limit,message) {
                btn.parents('.option').hide();
                $('.footer').show();
                $('.question.option').first().show();
                // 开始计时
                index.functions.second_start();
            }, function (limit,message) {
                $.alert({
                    title : "提示",
                    content: message,
                    confirmButton : "确认",
                    confirmButtonClass: 'btn-success',
                    confirm : function () {

                    }
                });
            });
        });
        //点击规则说明
        $('.rule-button').on('click', function () {
            $(this).parents('.option').hide();
            //规则展示
            $('.rule-context.option').show();
        });
        //点击规则返回答题
        $('.rule-context').on('click', function () {
            $(this).hide();
            $('.index.option').show();
        });
        //题目选项点击
        $('.question.option').on('click','.select-option', function () {
            var current_btn = $(this);
            index.functions.answer_one_question(current_btn);
            setTimeout(function () {
                var current_question = current_btn.parents('.question');
                current_question.hide();
                var next = current_question.next();
                next.show();
                if(next.hasClass('last-page')){
                    index.data.time_cost = index.data.time_count;
                    $(".score").text(parseInt(index.data.score));
                    $("#second").text(parseInt(index.data.time_cost));
                    $('.footer').hide();
                    //发送成绩
                    index.functions.send_results();
                }
            },300);
        });
    },
    functions : {
        checkPlayLimit : function(success,error){
            var checkUrl = $("html").data("check-limit-url");
            var postData = {
                "activity_id" : $("html").data("activity-id")
            };

            $.post(checkUrl,postData, function (e) {
                var json = e;
                if(json.status == 200){
                    if(json.data.limit <= 0){
                        error(json.data.limit,json.data.message);
                    }else{
                        success(json.data.limit,json.data.message);
                    }
                }else{
                    error(0,json.data.message);
                }
            });
        },

        //答了一道题
        answer_one_question : function (current_btn) {
            index.data.answered_count = index.data.answered_count + 1;
            $('#answered-count').text(index.data.answered_count);
            var is_right = current_btn.data('right');
            if(is_right == 1){
                index.functions.answer_right(current_btn);
            }else if(is_right == 0){
                index.functions.answer_wrong(current_btn);
            }
        },
        //答对一道题
        answer_right : function (current_btn) {
            var current_question = current_btn.parents('.question');
            var question_id = current_question.data('question-id');
            current_btn.addClass('selected-success');
            index.data.right_answer = index.data.right_answer + 1;
            index.data.right_ids = index.data.right_ids+','+question_id;
            index.data.score = index.data.score + parseInt(current_question.data('score'));
        },
        //答错一道题
        answer_wrong : function(current_btn){
            var current_question = current_btn.parents('.question');
            var question_id = current_question.data('question-id');
            current_btn.addClass('selected-error');
            index.data.wrong_answer = index.data.wrong_answer + 1;
            index.data.wrong_ids = index.data.wrong_ids+','+question_id;
            index.data.score = index.data.score - parseInt(current_question.data('descore'));
        },
        //开始计时
        second_start : function(){
            setTimeout(function () {
                index.data.time_count = index.data.time_count + 1;
                $('#time-count').text(index.data.time_count);
                index.functions.second_start();
            },1000);
        },
        //发送成绩
        send_results : function(){
            var post_url = $('html').data('send-result-url');
            var post_data = {
                right : index.data.right_answer,
                wrong : index.data.wrong_answer,
                answer_seconds : index.data.time_cost,
                right_ids : index.data.right_ids,
                wrong_ids : index.data.wrong_ids,
                score : index.data.score,
                activity_id : $("html").data('activity-id')
            }
            $.post(post_url,post_data, function (e) {
                var json = JSON.parse(e);
                //做一些操作
            });
        }
    }
};
$(function () {
    index.init();
    index.event();
})