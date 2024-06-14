
import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';

interface MyComponentProps {
  isModalOpen: boolean; 
  setIsModalOpen: ()=>void;
  refresh: () =>void;
  project: any,
  action : string
}
const ProjectModal: React.FC <MyComponentProps> = (props: MyComponentProps) => {

  const [form] = Form.useForm();

  const saveProject = ( data : { tittle : string; description : string }) => {
    axios.post( `http://localhost:5000/projects`, data ).then( done => {

        message.success("Your project have successfully saved");
        props.refresh();
        props.setIsModalOpen();

    }).catch( error =>{
        message.warning("Failed to save the project")
    })
}

const editProject = ( data : { tittle : string; description : string, id: number}) => {
  axios.put( `http://localhost:5000/projects/${props.project?.id}`, data ).then( done => {

      message.success("Your project have successfully updated");
      props.refresh();
      props.setIsModalOpen();

  }).catch( error =>{
      message.warning("Failed to save the project")
  })
}


useEffect ( ()=>{
  form.resetFields();
  form.setFieldsValue(props.project);

}, [props.project, form ])

  return (
    <>
      <Modal 
        title="Project" 
        open={props.isModalOpen} 
        footer = {[
          <Button htmlType='submit' form={'loginInForm'} type="primary">Save Project</Button>
        ]}
        onCancel={()=>props.setIsModalOpen()}
        >
        
        <Form
                
        id = "loginInForm"
        form={form}
        onFinish={ (v) => {
            props.action === "edit"? editProject(v) : saveProject(v)
          } }>

            <Form.Item 
            name={'tittle'}
            rules={[
              {
                required: true,
                message: "Please input project tittle!",
              },
            ]}
            >
                <Input
                style={{ height : 33 }}
                name="tittle"
                placeholder="Enter your tittle"
                />
            </Form.Item>

            <Form.Item name={'description'}>
                <TextArea 
                style={{ height : 33 }}
                name="description"
                placeholder="Project Description"
                />
            </Form.Item>

        </Form>
      </Modal>
    </>
  );
};

export default ProjectModal;