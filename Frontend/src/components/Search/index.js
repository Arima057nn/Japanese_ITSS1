import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import styles from "./Search.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import { teacherApi } from "../../services/teacher-api";
import ItemInfo from "../Teacher/ItemInfo";
import _ from "lodash";
import {
  DAY,
  TIME,
  TUTION,
  ADDRESS,
  GENDER,
  AGE,
  TARGET,
  LEVEL,
} from "../../constants/common";

const cx = classNames.bind(styles);

function Search() {
  const [teachers, setTeachers] = useState([]);
  const [teacherSearch, setTeacherSearch] = useState([]);
  const [selectedOption, setSelectedOption] = useState({
    tution: "",
    age: "",
    available_day: "",
    level: "",
    address: "",
    sex: "",
    target_id: "",
  });
  useEffect(() => {
    getTeachers();
  }, []);

  const getTeachers = async () => {
    let res = await teacherApi.searchTeacher({});
    console.log("resssss: ", res);
    setTeachers(res);
    setTeacherSearch(res);
  };

  const handleSearch = async () => {
    console.log("value: ", selectedOption);
    const filters = selectedOption;
    const appliedFilters = _.pickBy(filters, (value) => value !== "");
    // apply your filter logic here based on the selected values of city, district and ward
    if (_.isEmpty(appliedFilters)) {
      // no values selected, do not apply any filters
      setTeacherSearch(teachers);
    } else {
      console.log("appliedFilters: ", appliedFilters);
      let res = await teacherApi.searchTeacher(appliedFilters);
      // console.log("res1: ", res);
      setTeacherSearch(res);
    }
  };

  return (
    <>
      <div className={cx("content0")}>
        <div className={cx("content1")}>
          <p className={cx("tittle")}>自分に合う教師を探しましょう ~</p>
          <div className={cx("loc")}>
            <div className={cx("filter")}>
              <select
                name=""
                className={cx(
                  "chung",
                  selectedOption.available_day !== "" ? "check" : "notcheck"
                )}
                onChange={(e) => {
                  setSelectedOption({
                    ...selectedOption,
                    available_day: e.target.value,
                  });
                }}
              >
                <option value="" className={cx("option-header")}>
                  {DAY}
                </option>
                <option value="2">月曜日</option>
                <option value="3">火曜日</option>
                <option value="4">水曜日</option>
                <option value="5">木曜日</option>
                <option value="6">金曜日</option>
                <option value="7">土曜日</option>
                <option value="8">日曜日</option>
              </select>
            </div>
            <div className={cx("filter")}>
              <select name="" className={cx("chung")}>
                <option value="" className={cx("option-header")}>
                  {TIME}
                </option>
                <option value="Morning">朝</option>
                <option value="Noon">昼</option>
                <option value="Evening">夕方</option>
                <option value="Night">夜</option>
              </select>
            </div>
            <div className={cx("filter")}>
              <select
                name=""
                className={cx(
                  "chung",
                  selectedOption.tution !== "" ? "check" : "notcheck"
                )}
                onChange={(e) => {
                  setSelectedOption({
                    ...selectedOption,
                    tution: e.target.value,
                  });
                }}
              >
                <option value="" className={cx("option-header")}>
                  {TUTION}{" "}
                </option>
                <option value="100">100円から</option>
                <option value="200">200円から</option>
                <option value="300">300円から</option>
                <option value="400">400円から</option>
                <option value="500">500円から</option>
              </select>
            </div>
            <div className={cx("filter")}>
              <select
                name=""
                className={cx(
                  "chung",
                  selectedOption.address !== "" ? "check" : "notcheck"
                )}
                onChange={(e) => {
                  setSelectedOption({
                    ...selectedOption,
                    address: e.target.value,
                  });
                }}
              >
                <option value="" className={cx("option-header")}>
                  {ADDRESS}
                </option>
                <option value="Ha Noi">Ha Noi</option>
                <option value="Ho Chi Minh">Ho Chi Minh</option>
              </select>
            </div>
            <div className={cx("filter")}>
              <select
                name=""
                className={cx(
                  "chung",
                  selectedOption.sex !== "" ? "check" : "notcheck"
                )}
                onChange={(e) => {
                  setSelectedOption({
                    ...selectedOption,
                    sex: e.target.value,
                  });
                }}
              >
                <option value="" className={cx("option-header")}>
                  {GENDER}
                </option>
                <option value="Male">男の人</option>
                <option value="Famale">女の人</option>
              </select>
            </div>
            <div className={cx("filter")}>
              <select
                name=""
                className={cx(
                  "chung",
                  selectedOption.age !== "" ? "check" : "notcheck"
                )}
                onChange={(e) => {
                  setSelectedOption({
                    ...selectedOption,
                    age: e.target.value,
                  });
                }}
              >
                <option value="" className={cx("option-header")}>
                  {AGE} (以下)
                </option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
                <option value="25">25</option>
                <option value="26">26</option>
                <option value="27">27</option>
                <option value="28">28</option>
                <option value="29">29</option>
                <option value="30">30</option>
                <option value="31">31</option>
                <option value="32">32</option>
                <option value="33">33</option>
                <option value="34">34</option>
                <option value="35">35</option>
                <option value="36">36</option>
                <option value="37">37</option>
                <option value="38">38</option>
                <option value="39">39</option>
                <option value="40">40</option>
                <option value="41">41</option>
                <option value="42">42</option>
                <option value="43">43</option>
                <option value="44">44</option>
                <option value="45">45</option>
                <option value="46">46</option>
                <option value="47">47</option>
                <option value="48">48</option>
                <option value="49">49</option>
                <option value="50">50</option>
              </select>
            </div>
            <div className={cx("filter")}>
              <select
                name=""
                className={cx(
                  "chung",
                  selectedOption.target_id !== "" ? "check" : "notcheck"
                )}
                onChange={(e) => {
                  setSelectedOption({
                    ...selectedOption,
                    target_id: e.target.value,
                  });
                }}
              >
                <option value="" className={cx("option-header")}>
                  {TARGET}
                </option>
                <option value="1">日常会話</option>
                <option value="2">ビジネス</option>
                <option value="3">ベトナム語能力の試験</option>
              </select>
            </div>
            <div className={cx("filter")}>
              <select
                name=""
                className={cx(
                  "chung",
                  selectedOption.level !== "" ? "check" : "notcheck"
                )}
                onChange={(e) => {
                  setSelectedOption({
                    ...selectedOption,
                    level: e.target.value,
                  });
                }}
              >
                <option value="" className={cx("option-header")}>
                  {LEVEL}
                </option>
                <option value="1">ビギナー</option>
                <option value="2">初級</option>
                <option value="3">中級</option>
                <option value="4">上級</option>
              </select>
            </div>

            <div>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#DBDAD8",
                  color: "#333",
                  fontSize: 40,
                  height: 40,
                  marginRight: 16,
                  "&:hover": {
                    backgroundColor: "#a09597",
                  },
                }}
                startIcon={<SearchIcon />}
                size="large"
                onClick={handleSearch}
              ></Button>
            </div>
          </div>
        </div>
        <div className={cx("content2")}>
          {teacherSearch.length === 0 ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginTop: "40px",
              }}
            >
              <h1>教師を検索する結果はありません！</h1>
            </div>
          ) : (
            teacherSearch.map((teacher, i) => (
              <ItemInfo key={i} teacher={teacher} />
            ))
          )}
        </div>
      </div>
    </>
  );
}
export default Search;
