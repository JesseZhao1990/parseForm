
//闭包限定命名空间
(function ($) {
    $.fn.extend({
        /**
        * 将表单的内容转变成对象
        * @param
        * return 转换结果{formFiledName1：value1，formFiledName2：value2}
        */
        "parseForm": function (options) {

            var _self = this;
            //检测用户传进来的参数是否合法
            if (!isValid(options) || _self.length==0) return null;

            //使用jQuery.extend 覆盖插件默认参数
            var opts = $.extend({}, defaluts, options); 

            var fields = _self.serializeArray();

            _self.each(function () {  //这里的_self 就是 jQuery对象

                    var $thisForm = $(this);
                    // 得到checkbox的值
                    $.inArray('checkbox', opts.exclude) == -1 && 
                        $thisForm.find(':checkbox').each(function (i, obj) {
                            obj.name && fields.push({name : obj.name, value : obj.checked ? '1' : '0'});
                        });

                    // 得到disabled的值
                    $.inArray('disabled', opts.exclude) == -1 && 
                        $thisForm.find('input:disabled, select:disabled').each(function (i, obj) {
                            obj.name && fields.push({name : obj.name, value : obj.value});
                        });
            });

            if (!fields.length) return null;

            var result = {};
            $.each(fields, function(i, obj) { 
                result[obj.name] = $.fn.parseForm.encodeTextEnter(obj.value);
            });

            return result;

        }
    });

    //默认参数
    var defaluts = {
        exclude: []
    };

    //公共的格式化 方法. 默认是加粗，用户可以通过覆盖该方法达到不同的格式化效果。
    $.fn.parseForm.encodeTextEnter = function(text) {
        if (!text || typeof text != 'string') return text;
        return text.trim().replace(/[\n]/g, '<br/>');
    }

    //私有方法，检测参数是否合法
    function isValid(options) {
        return !options || (options && typeof options === "object") ? true : false;
    }

})(window.jQuery);