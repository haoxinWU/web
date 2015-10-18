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
    },
    init : function(){
        //题目数初始化
        index.data.question_count = parseInt($('#question-count').text());
    },
    event : function () {
        //开始答题按钮
        $('.start-button').on('click', function () {
            $(this).parents('.option').hide();
            $('.footer').show();
            $('.question.option').first().show();
            // 开始计时
            index.functions.second_start();
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
                }
            },300);
        });
    },
    
    functions : {
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
            current_btn.addClass('selected-success');
            index.data.right_answer = index.data.right_answer + 1;
            index.data.score = index.data.score + parseInt(current_question.data('score'));

        },
        //答错一道题
        answer_wrong : function(current_btn){
            var current_question = current_btn.parents('.question');
            current_btn.addClass('selected-error');
            index.data.wrong_answer = index.data.wrong_answer + 1;
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