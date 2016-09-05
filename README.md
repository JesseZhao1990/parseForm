# parseForm
把form中的名字和对应的值取到放到一个对象中，方便直接向后台传参
##用法
1. 引入parseForm.js
2. $form.parseForm()      //$form jquery对象    parseForm()默认会把checkboxs和disabled的value也娶到。若想排除。需传入参数["disabled","checkbox"]
