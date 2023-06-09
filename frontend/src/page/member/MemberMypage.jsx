import { useState, useCallback, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router";
import wisdoms from "@constants/wisdom.json";
import profiles from "@constants/profile.json";
import { GoPencil } from "react-icons/go";
import Input from "@component/Input";
import { Modal, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getMember,
  profileUpdate,
  remove,
  update,
} from "@features/memberUpdateSlice";
import { isLoginCheck } from "@features/commonSlice/loginSlice";

const backglow1 = keyframes`
0% {
  transform: translate(10%, 10%) scale(1);
  opacity: 0.5;
}

25% {
  transform: translate(-10%, 10%) scale(0.8);
  opacity: 0.5;
}

50% {
  transform: translate(-10%, -10%) scale(1.2);
  opacity: 0.8;
}

75% {
  transform: translate(10%, -10%) scale(1.1);
  opacity: 0.2;
}

100% {
  transform: translate(10%, 10%) scale(1);
  opacity: 0.5;
}
`;

const Wrapper = styled.div`
  height: 80%;
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
`;

const Title = styled.div`
  color: white;
  position: relative;
  font-size: 40px;
  margin-top: 10%;
`;
const Subtitle = styled.div`
  position: relative;
  color: white;
  font-size: 15px;
  line-height: 1.5em;
  max-width: 500px;
  margin: 5%;
`;

const Button = styled.button`
  width: 30px;
  position: relative;
  padding: 5px 20px;
  margin: 2%;
  border: 1px solid white;
  border-radius: 15px;
  background-color: rgba(0, 0, 0, 0);
  color: white;
  font-size: 15px;
  font-family: "TAEBAEKmilkyway";
  float: right;
  right: 10%;
`;

const MypageProfile = styled.div`
  position: relative;
  content: "";
  height: auto;
`;

const MyUpdate = styled.div`
  background-color: transparent;
  width: 320px;
  height: 200px;
  margin: auto;
  cursor: pointer;
  border-radius: 5%;
  perspective: 1000px;
  pointer-events: auto;
  position: relative;
`;

// modal style - mui
const boxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  overflow: "scroll",
  transform: "translate(-50%, -50%)",
  width: 250,
  height: 260,
  bgcolor: "rgba(255, 255, 255, 0.8)",
  border: "none",
  borderRadius: 2,
  boxShadow: "none",
  p: 4,
};

const ModalImg = styled.div`
  text-align: center;
  margin: 5% 5% 0 5%;
  opacity: 0.3;
  img {
    height: 90px;
  }
  opacity: ${({ selected }) => (selected ? "1" : "0.3")};
`;

function MemberMypage() {
  const dispatch = useDispatch();
  const userinfo = useSelector((state) => state.memberUpdate);
  const memberInfo = useSelector((state) => state.memberUpdate);
  const { memberId, password, nickname, profile, email, lux, heal } =
    memberInfo;

  const [values, setValues] = useState({
    memberId: "",
    password: "",
    passwordConfirm: "",
    nickname: "",
    profile: 0,
    email: "",
    lux: 0,
    heal: 0,
  });
  const [errors, setErrors] = useState({
    nickname: "",
    password: "",
  });

  // 명언 json파일관리
  const [selectWisdom, setSelectWisdom] = useState({
    number: 0,
    wisdom: "",
    writer: "",
  });

  // 필드 방문 상태를 관리한다
  const [touched, setTouched] = useState({
    nickname: false,
    password: false,
  });

  // flip 상태관리
  const [flipped, setFlipped] = useState(false);

  const flipHandler = () => {
    setFlipped(!flipped);
  };

  // modal profile icon list 선택관리
  const [profileSelected, setProfileSelected] = useState(0);

  const profileSelectHandler = (idx) => {
    console.log("idx", idx);
    // if (values.lux >= profiles[idx].starlux) {
    setProfileSelected(idx);
    // let newlux = values.lux - profiles[idx].starlux;
    setValues({
      ...values,
      profile: idx,
      // lux: newlux,
    });
    // }
  };
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  // blur 이벤트가 발생하면 touched 상태를 true로 바꾼다
  const handleBlur = (e) => {
    setTouched({
      ...touched,
      [e.target.name]: true,
    });
  };

  const updateSubmitHandler = (e) => {
    e.preventDefault();
    // 모든 필드에 방문했다고 표시한다.
    setTouched({
      nickname: true,
      password: true,
    });

    // 필드 검사 후 잘못된 값이면 제출 처리를 중단한다.
    const errors = validate();
    // 오류 메세지 상태를 갱신한다
    setErrors(errors);
    // 잘못된 값이면 제출 처리를 중단한다.
    if (Object.values(errors).some((v) => v)) {
      return;
    }
    if (window.confirm("정보를 수정하시겠습니까?")) {
      alert("수정되었습니다.");
      dispatch(update(values));
    } else {
      alert("수정을 취소하셨습니다.");
      return;
    }
    // setIsUpdated(false);
    // setFlipped(false);
  };

  // 필드값을 검증한다.
  const validate = useCallback(() => {
    const errors = {
      nickname: "",
      password: "",
    };

    if (!values.nickname) {
      errors.nickname = "닉네임을 입력하세요";
    }
    if (!values.password) {
      errors.password = "비밀번호를 입력하세요";
    }
    return errors;
  }, [values]);

  useEffect(() => {
    // 1-101 난수생성
    const min = 1;
    const max = 101;
    let randNumber = Math.floor(Math.random() * (max - min)) + min;
    setSelectWisdom(wisdoms[randNumber]);
  }, []);

  useEffect(() => {
    dispatch(getMember());
  }, [dispatch]);

  useEffect(() => {
    if (userinfo) {
      setValues({
        memberId: userinfo.memberId,
        password: userinfo.password,
        passwordConfirm: userinfo.password,
        nickname: userinfo.nickname,
        profile: userinfo.profile,
        email: userinfo.email,
        lux: userinfo.lux,
        heal: userinfo.heal,
      });
    }
  }, [userinfo]);

  useEffect(() => {}, []);

  // 입력값이 변경될때 마다 검증한다.
  useEffect(() => {
    validate();
  }, [validate]);

  const changeProfileHandler = () => {
    handleOpen();
  };

  // 회원탈퇴버튼
  const resignHandler = () => {
    if (window.confirm("정말 탈퇴하시나요?")) {
      alert("탈퇴되었습니다.");
      dispatch(remove());
      localStorage.clear();
      dispatch(isLoginCheck(false));
      navigate("/");
    } else {
      alert("탈퇴를 취소하셨습니다.");
    }
  };

  // modal 관리
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setValues((prevalue) => ({
      ...prevalue,
      profile: profileSelected,
    }));
    dispatch(profileUpdate(values));
    setProfileSelected(values.profile);
  };
  return (
    <>
      <Wrapper>
        <div className="mypage">
          {values.nickname && (
            <Title className="mypage-text">
              {values.nickname}
              <span style={{ fontSize: "15px" }}>님 안녕하세요</span>
            </Title>
          )}

          <Subtitle className="mypage-wisdom">
            {selectWisdom.wisdom}<br/><br/>-{selectWisdom.writer}
          </Subtitle>
          <MypageProfile className="mypage-profile">
            {values.profile && (
              <img
                src={profiles[values.profile].starImageUrl}
                alt="profile"
                style={{ height: "90px" }}
              />
            )}
            <GoPencil onClick={changeProfileHandler} color="white" />
          </MypageProfile>
          <MyUpdate
            className={`mypage-update ${flipped ? "active" : ""}`}
            onClick={flipHandler}
          >
            <div className="mypage-update-inner">
              <div className="mypage-back">
                <div className="mypage-area">
                  <form className="update-form" onSubmit={updateSubmitHandler}>
                    <div className="input-box">
                      <div className="input-name">아이디</div>
                      <Input
                        type="text"
                        name="memberId"
                        value={values.memberId}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder={values.memberId}
                        width={"60%"}
                        textIndent={"0px"}
                        style={{ fontSize: "15px" }}
                        disabled
                      />
                    </div>
                    <div className="input-box">
                      {/* <div className="input-name">별명</div> */}
                      <Input
                        type="text"
                        name="nickname"
                        value={values.nickname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder={values.nickname}
                        width={"60%"}
                        textIndent={"0px"}
                        style={{ fontSize: "15px" }}
                      />
                    </div>
                    <div className="input-box">
                      {/* <div className="input-name">이메일</div> */}
                      <Input
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder={values.email}
                        width={"60%"}
                        textIndent={"0px"}
                        style={{ fontSize: "15px" }}
                        disabled
                      />
                    </div>
                    <div className="input-box">
                      {/* <div className="input-name">비밀번호</div> */}
                      <Input
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Password"
                        width={"60%"}
                        textIndent={"0px"}
                        style={{ fontSize: "15px" }}
                      />
                    </div>
                    <div className="input-box">
                      <div className="input-name"></div>
                      <Input
                        type="password"
                        name="passwordConfirm"
                        value={values.passwordConfirm}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Password"
                        width={"60%"}
                        textIndent={"0px"}
                        style={{ fontSize: "15px" }}
                      />
                    </div>
                    {/* {isUpdated && ( */}
                    <Button
                      type="submit"
                      style={{ marginTop: "9%", marginRight: "-8%" }}
                    >
                      수정
                    </Button>
                    {/* )} */}
                  </form>
                </div>
                <Button
                  type="button"
                  onClick={resignHandler}
                  className="resign-button"
                  style={{
                    width: "40px",
                    fontSize: "10px",
                    marginTop: "9%",
                    border: "none",
                    color: "gray",
                    position: "relative",
                    float: "left",
                    left: "10px",
                  }}
                >
                  탈퇴하기
                </Button>
              </div>
            </div>
          </MyUpdate>
        </div>
      </Wrapper>
      <Modal
        open={open}
        onClose={handleClose}
        aria-describedby="modal-modal-description"
      >
        <Box className="modal-box" sx={boxStyle}>
          <Typography className="modal-header">
            <span onClick={handleClose}>프로필 바꾸기</span>
            {/* <span onClick={handleClose}>&times;</span> */}
          </Typography>
          <Typography className="modal-body" id="modal-modal-description">
            {profiles.map((star) => (
              <ModalImg
                selected
                className={
                  profileSelected === star.starId
                    ? "modal-img selected"
                    : "modal-img"
                }
                onClick={() => profileSelectHandler(star.starId)}
                key={star.starId}
                id={star.starId}
                value={star.starName}
              >
                <img src={star.starImageUrl} alt={star.starName} />
                {/* <div>{star.starlux} lux</div> */}
              </ModalImg>
            ))}
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export default MemberMypage;
