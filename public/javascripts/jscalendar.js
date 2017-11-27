function init() {
    scheduler.init('scheduler_here',new Date(2017,11,4),"month");

            scheduler.templates.xml_date = function(value){ return new Date(value); };
            scheduler.load("/data", "json");
}

scheduler.config.xml_date="%Y-%m-%d %H:%i";

        var dp = new dataProcessor("/data");
        dp.init(scheduler);
        dp.setTransactionMode("POST", false);
