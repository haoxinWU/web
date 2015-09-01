/**
 * Created by leon on 8/8/15.
 * 当一个字符串数量超出size个字的时候,省略前边或者后边
 * content 要被处理的字符串
 * target 将省略号放在前面还是后面
 * size 长度限制,如果字符串的长度超过此数量,则截取
 */
Template7.registerHelper('ellipsis',function(content, target, size){
    var realSize = content.length;
    if(realSize <= size){
        //当字符串长度不足的时候,直接返回
        return content;
    }else{
        //当字符串的长度超过的时候,处理一下
        if(target == 'start'){
            var start = realSize - size;
            var result = content.substring(start);
            return "..."+result;
        }else if(target == 'end'){
            var stop = size;
            var result = content.substring(0, size);
            return result + "...";
        }
    }
});