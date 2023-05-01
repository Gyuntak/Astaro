package com.a604.boardservice.entity;

import com.a604.boardservice.dto.TaroResultDto;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@EntityListeners(AuditingEntityListener.class)
@Getter
@Entity
@Table(name="taro_result")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class TaroResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long seq;

    @Column(nullable = false)
    private long memberSeq;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private String input;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String cardSeqList;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String contentList;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String imgList;
    @Column(columnDefinition = "BIT", length = 1, nullable = false)
    @ColumnDefault("0")
    private Boolean isDangerous;
    @Column(columnDefinition = "BIT", length = 1, nullable = false)
    @ColumnDefault("0")
    private Boolean isPublic;

    @CreatedDate
    @Column(updatable = false, nullable = false)
    @ColumnDefault("CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    @Column(columnDefinition = "BIT", length = 1, nullable = false)
    @ColumnDefault("0")
    private Boolean isDeleted;

    public TaroResultDto toDto() {
        TaroResultDto taroResultDto = TaroResultDto.builder()
                .seq(this.seq)
                .memberSeq(this.memberSeq)
                .category(this.category)
                .input(this.input)
                .cardSeqList(this.cardSeqList)
                .contentList(this.contentList)
                .imgList(this.imgList)
                .isDangerous(this.isDangerous)
                .isPublic(this.isPublic)
                .createdAt(this.createdAt)
                .isDeleted(this.isDeleted)
                .build();
        return taroResultDto;
    }
}
