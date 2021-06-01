function article(){
$.ajax({
    type:"post",
    url:"/admin/article/viewAjax",
    success:function(data){
        $("#view").empty();
        for(var i in data ){
            $("#view").append(
                `   
            <tr>    
                <th>${data[i].id}</th>
                <td>${data[i].title}</td>
                <td>${data[i].content}</td>
                <td>
                </td>
                <td>
                <input onclick='location.href=("/admin/article/edit")' type="button" name="edit" class="Edit" value="编辑"  >
                <input type="button" name="del" class="del" data-id=${data[i].id} value="删除">
                </td>
            </tr>
                  `
            )
        }
    }
})
}
article();


$("#view").delegate(".del","click",function(){
    $.ajax({
        type:"post",
        url:"/admin/article/delAjax",
        data:{"id":$(this).data("id")},
        success:function(data){
            if(data.data==1){
                article();
            }
        }
    })
})

$("#view").delegate(".Edit","click",function(){
    $.ajax({
        type:"post",
        url:"/admin/article/editAjax",

    })
})
