import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { FaUserCircle } from 'react-icons/fa';
import SmallAuthCardView from '../../common/ui/layout/auth-layout/components/smallAuthCardView';
import MainLayout from '../../common/ui/layout/main-layout';
import { SmallTextInput } from '../../common/ui/base/textInput';
import { phoneReg, UserInfo } from '../../common/util/common';
import { MiddleMainButton } from '../../common/ui/base/button';
import { Color, NotifyType, Url } from '../../common/util/enum';
import { toastNotify } from '../../common/ui/base/toast/notify';
import { api_url, getUserInfoFromAPI } from '../../common/util/baseAPI';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../models/store';
import axios from 'axios';
import { addAccountDetail } from '../../models/accountDetailReducers';

interface EditProfileInfo {
  name: string;
  phone: string;
  address: string;
}
const Profile = () => {
  const account = useSelector((state: RootState) => state.accountReducer);
  const accountDetail = useSelector(
    (state: RootState) => state.accountDetailReducer
  );
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    clearErrors,
  } = useForm({
    reValidateMode: 'onSubmit',
    defaultValues: accountDetail,
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const resetValue = () => {
    reset(accountDetail);
    clearErrors();
  };

  const handleEditProfile = async (editInfo: EditProfileInfo) => {
    if (isEditing) {
      const token = await window.sessionStorage.getItem('token');
      if (token && account.email !== '') {
        delete editInfo.joinDate;
        delete editInfo._id;
        await axios({
          url: `user/edit-detail/${account.id_userInfo}`,
          baseURL: `${api_url}`,
          method: 'put',
          headers: {
            'x-auth-token': token,
          },
          data: editInfo,
          responseType: 'json',
        })
          .then((res) => {
            if (res.data['code'] === 200) {
              dispatch(addAccountDetail(res.data['data']));
              setIsEditing(false);
              toastNotify(NotifyType.success, 'Chỉnh sửa thông tin thành công');
            } else {
              resetValue();
              setIsEditing(false);
              toastNotify(NotifyType.error, 'Không thể chỉnh sửa thông tin');
            }
          })
          .catch((err) => {
            setIsEditing(false);
            toastNotify(NotifyType.error, 'Không thể chỉnh sửa thông tin');
          });
      }
    }
  };

  return (
    <MainLayout>
      <SmallAuthCardView>
        <Row style={{ width: '100%' }}>
          <Col
            sm={2}
            className="d-flex align-items-center justify-content-center"
          >
            <FaUserCircle size={75} />
          </Col>

          <Col sm={10}>
            <form onSubmit={handleSubmit(handleEditProfile)}>
              <Row>
                <Col sm={8}>
                  <h3 style={{ marginBottom: '30px' }}>Thông tin khách hàng</h3>
                  <Col
                    xs="auto"
                    style={{
                      alignItems: 'center',
                      paddingRight: '10px',
                      paddingLeft: '10px',
                      width: '100%',
                    }}
                  >
                    <Controller
                      control={control}
                      rules={{ required: true, minLength: 2, maxLength: 50 }}
                      render={({ field: { onChange, value } }) => (
                        <SmallTextInput
                          type="text"
                          placeholder="Họ tên"
                          onChange={onChange}
                          eyeVisible={false}
                          passwordVisible={false}
                          toggleVisible={() => {}}
                          disabled={!isEditing}
                          value={value}
                        />
                      )}
                      name="name"
                      defaultValue=""
                    />
                    {errors.name && (
                      <span className="errorText">Tên không đúng</span>
                    )}

                    <Controller
                      control={control}
                      rules={{ required: true, pattern: phoneReg }}
                      render={({ field: { onChange, value } }) => (
                        <SmallTextInput
                          type="text"
                          placeholder="Số điện thoại"
                          onChange={onChange}
                          eyeVisible={false}
                          passwordVisible={false}
                          toggleVisible={() => {}}
                          disabled={!isEditing}
                          value={value}
                        />
                      )}
                      name="phone"
                      defaultValue=""
                    />
                    {errors.phone && (
                      <span className="errorText">
                        Số điện thoại không đúng định dạng
                      </span>
                    )}

                    <Controller
                      control={control}
                      rules={{ required: true, minLength: 5, maxLength: 100 }}
                      render={({ field: { onChange, value } }) => (
                        <SmallTextInput
                          type="text"
                          placeholder="Địa chỉ khách hàng"
                          onChange={onChange}
                          eyeVisible={false}
                          passwordVisible={false}
                          toggleVisible={() => {}}
                          disabled={!isEditing}
                          value={value}
                        />
                      )}
                      name="address"
                      defaultValue=""
                    />
                    {errors.address && (
                      <span className="errorText">Địa chỉ không đúng</span>
                    )}

                    <Controller
                      control={control}
                      rules={{ required: true, minLength: 5, maxLength: 100 }}
                      render={({ field: { onChange, value } }) => (
                        <SmallTextInput
                          type="text"
                          placeholder="Ngày đăng ký"
                          onChange={onChange}
                          eyeVisible={false}
                          passwordVisible={false}
                          toggleVisible={() => {}}
                          disabled={true}
                          value={value}
                        />
                      )}
                      name="joinDate"
                      defaultValue=""
                    />
                  </Col>
                </Col>
                <Col sm={3} className="d-flex align-items-center">
                  {isEditing ? (
                    <Col>
                      <MiddleMainButton
                        backgroundColor={Color['light-blue']}
                        textColor={Color.white}
                        title="Lưu"
                        onPressed={() => {}}
                      >
                        <></>
                      </MiddleMainButton>
                      <Row style={{ height: '20px' }} />
                      <MiddleMainButton
                        backgroundColor={Color.pink}
                        textColor={Color.white}
                        title="Hủy"
                        onPressed={() => {
                          setIsEditing(false);
                          resetValue();
                        }}
                      >
                        <></>
                      </MiddleMainButton>
                    </Col>
                  ) : (
                    <MiddleMainButton
                      backgroundColor={Color['light-blue']}
                      textColor={Color.white}
                      title="Chỉnh sửa"
                      onPressed={() => {
                        setIsEditing(true);
                      }}
                    >
                      <></>
                    </MiddleMainButton>
                  )}
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      </SmallAuthCardView>
    </MainLayout>
  );
};

export default Profile;
