FasdUAS 1.101.10   ��   ��    k             l      ��  ��    j d	Crear tarea desde mensaje		Copyright (c) Microsoft Corporation.  Reservados todos los derechos.     � 	 	 �  	 C r e a r   t a r e a   d e s d e   m e n s a j e  	  	 C o p y r i g h t   ( c )   M i c r o s o f t   C o r p o r a t i o n .     R e s e r v a d o s   t o d o s   l o s   d e r e c h o s .    
  
 l     ��������  ��  ��     ��  l    � ����  O     �    k    �       l   ��������  ��  ��        l   ��  ��    5 / get the currently selected message or messages     �   ^   g e t   t h e   c u r r e n t l y   s e l e c t e d   m e s s a g e   o r   m e s s a g e s      r    	    1    ��
�� 
CMgs  o      ���� $0 selectedmessages selectedMessages      l  
 
��������  ��  ��        l  
 
��   !��     E ? if there are no messages selected, warn the user and then quit    ! � " " ~   i f   t h e r e   a r e   n o   m e s s a g e s   s e l e c t e d ,   w a r n   t h e   u s e r   a n d   t h e n   q u i t   # $ # Z   
  % &���� % =  
  ' ( ' o   
 ���� $0 selectedmessages selectedMessages ( J    ����   & k     ) )  * + * I   �� , -
�� .sysodlogaskr        TEXT , m     . . � / / x S e l e c c i o n e   p r i m e r o   u n   m e n s a j e   y   d e s p u � s   e j e c u t e   e s t e   s c r i p t . - �� 0��
�� 
disp 0 m    ���� ��   +  1�� 1 L    ����  ��  ��  ��   $  2 3 2 l     ��������  ��  ��   3  4 5 4 X     s 6�� 7 6 k   0 n 8 8  9 : 9 l  0 0��������  ��  ��   :  ; < ; l  0 0�� = >��   = F @ get the information from the message, and store it in variables    > � ? ? �   g e t   t h e   i n f o r m a t i o n   f r o m   t h e   m e s s a g e ,   a n d   s t o r e   i t   i n   v a r i a b l e s <  @ A @ r   0 5 B C B n   0 3 D E D 1   1 3��
�� 
subj E o   0 1���� 0 
themessage 
theMessage C o      ���� 0 thename theName A  F G F r   6 ; H I H n   6 9 J K J m   7 9��
�� 
cCtg K o   6 7���� 0 
themessage 
theMessage I o      ���� 0 thecategory theCategory G  L M L r   < A N O N n   < ? P Q P 1   = ?��
�� 
prty Q o   < =���� 0 
themessage 
theMessage O o      ���� 0 thepriority thePriority M  R S R r   B I T U T n   B E V W V 1   C E��
�� 
ctnt W o   B C���� 0 
themessage 
theMessage U o      ���� 0 
thecontent 
theContent S  X Y X l  J J��������  ��  ��   Y  Z [ Z l  J J�� \ ]��   \ > 8 create a new task with the information from the message    ] � ^ ^ p   c r e a t e   a   n e w   t a s k   w i t h   t h e   i n f o r m a t i o n   f r o m   t h e   m e s s a g e [  _ ` _ r   J l a b a I  J h���� c
�� .corecrel****      � null��   c �� d e
�� 
kocl d m   L O��
�� 
cTsk e �� f��
�� 
prdt f K   R b g g �� h i
�� 
pnam h o   U V���� 0 thename theName i �� j k
�� 
ctnt j o   W Z���� 0 
thecontent 
theContent k �� l m
�� 
cCtg l o   [ \���� 0 thecategory theCategory m �� n��
�� 
prty n o   ] ^���� 0 thepriority thePriority��  ��   b o      ���� 0 newtask newTask `  o�� o l  m m��������  ��  ��  ��  �� 0 
themessage 
theMessage 7 o   # $���� $0 selectedmessages selectedMessages 5  p q p l  t t��������  ��  ��   q  r s r l  t t�� t u��   t F @ if there was only one message selected, then open that new task    u � v v �   i f   t h e r e   w a s   o n l y   o n e   m e s s a g e   s e l e c t e d ,   t h e n   o p e n   t h a t   n e w   t a s k s  w�� w Z  t � x y���� x =   t { z { z l  t y |���� | I  t y�� }��
�� .corecnte****       **** } o   t u���� $0 selectedmessages selectedMessages��  ��  ��   { m   y z����  y I  ~ ��� ~��
�� .aevtodocnull  �    alis ~ o   ~ ����� 0 newtask newTask��  ��  ��  ��    m       >                                                                                  OPIM  alis    �  Macintosh HD 2             ���H+   G�BMicrosoft Outlook.app                                           G��ȈJi        ����  	                Microsoft Office 2011 EN    ���      Ȉ.I     G�B G�� G��  �  SMacintosh HD 2:Users:MartinT:Desktop:Microsoft Office 2011 EN:Microsoft Outlook.app   ,  M i c r o s o f t   O u t l o o k . a p p    M a c i n t o s h   H D   2  DUsers/MartinT/Desktop/Microsoft Office 2011 EN/Microsoft Outlook.app  /    ��  ��  ��  ��       �� � ���   � ��
�� .aevtoappnull  �   � **** � �� ����� � ���
�� .aevtoappnull  �   � **** � k     � � �  ����  ��  ��   � ���� 0 
themessage 
theMessage �  ���� .������������������������������������������
�� 
CMgs�� $0 selectedmessages selectedMessages
�� 
disp
�� .sysodlogaskr        TEXT
�� 
kocl
�� 
cobj
�� .corecnte****       ****
�� 
subj�� 0 thename theName
�� 
cCtg�� 0 thecategory theCategory
�� 
prty�� 0 thepriority thePriority
�� 
ctnt�� 0 
thecontent 
theContent
�� 
cTsk
�� 
prdt
�� 
pnam�� �� 
�� .corecrel****      � null�� 0 newtask newTask
�� .aevtodocnull  �    alis�� �� �*�,E�O�jv  ��kl OhY hO R�[��l kh  ��,E�O��,E�O��,E�O��,E` O*�a a a ��_ ����a a  E` OP[OY��O�j k  _ j Y hUascr  ��ޭ