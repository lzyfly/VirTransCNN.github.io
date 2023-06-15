var g_mylangvar={
		"lding":{'en':'loading...','cn':'加载中...'},
		"del_q":{'en':'delete this?','cn':'确认删除吗？'},
		"bd_ok":{'en':'success','cn':'绑定成功'},
		"upding":{'en':'updateing...','cn':'更新中...'},
		"uplding":{'en':'upload...','cn':'上传中...'},
		"sving":{'en':'saveing...','cn':'保存中...'},
		"pubing":{'en':'pubing','cn':'发布中...'},
		"ccel":{'en':'cancel','cn':'取消'},
		"ope_ok":{'en':'success','cn':'操作成功'},
		"submit":{'en':'submit','cn':'提交'},
		"del":{'en':'del','cn':'删除'},
		"no_more_num":{'en':'not more than {$num}','cn':'不能超过{$num}'},
		"no_less_num":{'en':'must more than {$num}','cn':'不能小于{$num}'},
		"no_epy":{'en':"can't empty",'cn':'不能为空'},
		"cfm":{'en':"confirm",'cn':'确认'},
		"sucess":{'en':"sucess",'cn':'操作成功'},
};
function g_set_lang(val){
	localStorage.setItem('mylang',val);
}
function g_get_lang(){
    var url = window.location.href;
    if(/setlang=/i.test(url)){
    	if(/setlang=zh/i.test(url)){
    		mylang='cn';
    	}else{
    		mylang='en';
    	}
    }else{
    	var mylang=localStorage.getItem('mylang');
    }
	if(mylang==''||mylang===null){
		var arr,reg=new RegExp("(^| )think_language=([^;]*)(;|$)");
		var lg='cn';
	    if(arr=document.cookie.match(reg)){
	    	lg=unescape(arr[2]);
	    	lg=(lg=='zh-CN'?'cn':'en');
	    }
	    localStorage.setItem('mylang',lg);
		mylang=lg;
	}
	return mylang;
}
function g_mylang(key,dfcn,vars){
	var lang=g_get_lang();
	if(dfcn==undefined){dfcn=''};
	if(!g_mylangvar.hasOwnProperty(key)){
		return dfcn?dfcn:key;
	}
	else{
		var aftlg=g_mylangvar[key].hasOwnProperty(lang)?g_mylangvar[key][lang]:(dfcn?dfcn:key);
		if(vars!=undefined&&vars!=''&&Object.prototype.toString.call(vars)=='[object Array]'){
			for(var ri in vars){
				if(vars[ri].hasOwnProperty('k')&&vars[ri].hasOwnProperty('v')){
					aftlg=aftlg.replace("[$"+vars[ri].k+"]",vars[ri].v);
				}
				else if(vars[ri].hasOwnProperty('call')){
					var autolgat=g_mylang(vars[ri].call);
					aftlg=aftlg.replace("{$"+vars[ri].k+"}",autolgat);
				}
			}
		}
		return aftlg;
	}
}