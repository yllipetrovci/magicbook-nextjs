// POST
const succeed = {
    "code": 0,
    "message": "SUCCEED",
    "request_id": "0e748220-9934-49a8-aec6-f204b7047b56",
    "data": {
        "task_id": "822953089408827433",
        "task_status": "submitted",
        "task_info": {},
        "created_at": 1764235825029,
        "updated_at": 1764235825029
    }
}

// GET in processing
const processing = {
    "code": 0,
    "message": "SUCCEED",
    "request_id": "8dde5a2b-d74d-4c95-bcd4-a95ea452046c",
    "data": {
        "task_id": "822953089408827433",
        "task_status": "processing",
        "task_info": {},
        "task_result": {},
        "task_status_msg": "",
        "created_at": 1764235825029,
        "updated_at": 1764235834382
    }
}

// After processing has completed

const completed = {
    "code": 0,
    "message": "SUCCEED",
    "request_id": "2bbcea36-c008-4aaa-86dd-520a09708755",
    "data": {
        "task_id": "822953089408827433",
        "task_status": "succeed",
        "task_info": {},
        "task_result": {
            "videos": [
                {
                    "id": "822953089593376815",
                    "url": "https://v16-kling-fdl.klingai.com/bs2/upload-ylab-stunt-sgp/muse/820893480699428916/VIDEO/20251127/da060d544d85cae9203465579206934c-97b683a1-e0d2-48e4-a778-097cc75a9987.mp4?cacheKey=ChtzZWN1cml0eS5rbGluZy5tZXRhX2VuY3J5cHQSsAG9-7s30BhNX80X0g3DpEiqUhV6TX7IcUJ4XOO1wPGgn3CNNAl-a0GHtRm4N-pkkRSZBelb4ry_14eUyETJnXXOEjvLvqCmxMT0LcI3eyRwBpN6rJxPssby9al5vuFTmqqG38s2McsUFvw-F_Ex665o3arC-DoSkMm_3Y2K5yeez1pjUynGgZggG2t3MzfYkFV2orpAkdj8ICDGds1RuOVO5ZsRnBpLEIvnbMEhy02LQhoSxWNjcgh9zqt_zDfpYBGATs3tIiBvFNl1pBHlAXI9sbUd3NgriP5ReVcTmr0Mfud-7hpdCigFMAE&x-kcdn-pid=112781&ksSecret=b813284a48e2ae9d3e1de7f9c7e886d2&ksTime=694fa816",
                    "duration": "5.1"
                }
            ]
        },
        "task_status_msg": "",
        "created_at": 1764235825029,
        "updated_at": 1764236054436
    }
}


// https: //api.klingai.com/v1/videos/image2video/822625426748080130