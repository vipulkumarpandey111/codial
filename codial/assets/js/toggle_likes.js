//create a class to toggle like when a link is clicked using AJAX
class ToggleLike{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.ToggleLike();
    }

    ToggleLike(){
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self=this;

            //this is a new way of writing ajax which you've studied,it looks same as promises
            $.ajax({
                type:'POST',
                url:$(self).attr('href'),
            })
            .done(function(data){
                let LikesCount = parseInt($(self).attr('data-likes'));
                console.log(LikesCount);
                if(data.data.deleted==true){
                    LikesCount-=1;
                }else{
                    LikesCount+=1;
                }

                $(self).attr('data-likes',LikesCount);
                $(self).html('${likesCount}Likes');
            })
            .fail(function(errData){
                console.log('error in completing the request');
            });
        });
    }
}